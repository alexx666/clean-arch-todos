import { TodoItem } from '@alexx666/todos';
import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { BehaviorSubject, debounceTime, filter, Subscription } from 'rxjs';

import { deleteTodo, loadTodos } from '../state/todos.actions';
import { selectLoading, selectTodos } from '../state/todos.selector';
import { TodoFeatureState } from '../state/todos.state';

@Component({
	selector: 'app-todos',
	templateUrl: './todos.component.html',
	styleUrls: ['./todos.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosComponent implements OnInit, OnDestroy {

	listName$ = new BehaviorSubject("");

	displayedColumns: string[] = ['select', 'description', 'start', 'end', 'expired', 'delete'];

	loading$ = this.store.select(selectLoading);
	items$ = this.store.select(selectTodos);

	private displayedItems: TodoItem[] = [];

	private listNameSubscription: Subscription;
	private itemsSubscription: Subscription;

	constructor(private readonly store: Store<TodoFeatureState>) {
		this.listNameSubscription = this.listName$.pipe(
			debounceTime(300),
			filter((value) => value !== ""),
		).subscribe((listName) => this.store.dispatch(loadTodos({ listName })));

		this.itemsSubscription = this.items$.subscribe((todos) => this.displayedItems = todos);
	}

	ngOnInit(): void { }

	ngOnDestroy(): void {
		this.listNameSubscription.unsubscribe();
		this.itemsSubscription.unsubscribe();
	}

	onSearchChange(term: any) {
		this.listName$.next(term.target.value);
	}

	selection = new SelectionModel<TodoItem>(true, []);

	isAllSelected() {
		const numSelected = this.selection.selected.length;
		const numRows = this.displayedItems.length;
		return numSelected === numRows;
	}

	toggleAllRows() {
		if (this.isAllSelected()) {
			this.selection.clear();
			return;
		}

		this.selection.select(...this.displayedItems);
	}

	checkboxLabel(row?: TodoItem): string {
		if (!row) {
			return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
		}
		return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
	}

	delete(todo: TodoItem) {
		this.store.dispatch(deleteTodo({ listName: this.listName$.value, id: todo.id }))
	}
}
