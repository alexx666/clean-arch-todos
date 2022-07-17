import { TodoItem } from '@alexx666/todos';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from "@ngrx/store";
import { BehaviorSubject, debounceTime, filter, Subscription } from 'rxjs';

import { deleteTodo, loadTodos } from '../state/todos.actions';
import { selectError, selectLoading, selectTodos } from '../state/todos.selector';
import { TodoFeatureState } from '../state/todos.state';

@Component({
	selector: 'app-todos',
	templateUrl: './todos.component.html',
	styleUrls: ['./todos.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosComponent implements OnInit, OnDestroy {

	listName$ = new BehaviorSubject("");

	displayedColumns: string[] = ['description', 'start', 'end', 'expired', 'delete'];

	loading$ = this.store.select(selectLoading);
	items$ = this.store.select(selectTodos);
	error$ = this.store.select(selectError);

	private listNameSubscription: Subscription;
	private errorSubscription: Subscription;

	constructor(
		private readonly store: Store<TodoFeatureState>,
		private _snackBar: MatSnackBar,
	) {
		this.listNameSubscription = this.listName$.pipe(
			debounceTime(300),
			filter((value) => value !== ""),
		).subscribe((listName) => this.store.dispatch(loadTodos({ listName })));

		this.errorSubscription = this.error$.subscribe((error) => this.showError(error));
	}

	ngOnInit(): void { }

	ngOnDestroy(): void {
		this.listNameSubscription.unsubscribe();
		this.errorSubscription.unsubscribe();
	}

	onSearchChange(term: any) {
		this.listName$.next(term.target.value);
	}

	delete(todo: TodoItem) {
		this.store.dispatch(deleteTodo({ listName: this.listName$.value, id: todo.id }))
	}

	showError(message: string | null) {
		if (!message) return;

		this._snackBar.open(message, "Close");
	}
}
