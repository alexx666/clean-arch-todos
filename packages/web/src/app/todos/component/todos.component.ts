import { TodoItem } from '@alexx666/todos-core';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from "@ngrx/store";
import { debounceTime, distinctUntilChanged, filter, Subject, takeUntil } from 'rxjs';

import { deleteTodo, loadTodos } from '../state/todos.actions';
import { selectError, selectLoading, selectSearchTerm, selectTodos } from '../state/todos.selector';
import { TodoFeatureState } from '../state/todos.state';

const DEBOUNCE_DELAY = 400;

@Component({
	selector: 'app-todos',
	templateUrl: './todos.component.html',
	styleUrls: ['./todos.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosComponent implements OnInit, OnDestroy {

	private readonly destroy$ = new Subject<void>();

	readonly searchBarForm: FormGroup;
	readonly searchField: FormControl;

	readonly displayedColumns: string[] = ['description', 'start', 'end', 'expired', 'delete'];

	readonly listName$ = this.store.select(selectSearchTerm);
	readonly loading$ = this.store.select(selectLoading);
	readonly items$ = this.store.select(selectTodos);
	readonly error$ = this.store.select(selectError);

	constructor(
		private readonly store: Store<TodoFeatureState>,
		private _snackBar: MatSnackBar,
		private formBuilder: FormBuilder,
	) {
		this.searchField = new FormControl();
		this.searchBarForm = this.formBuilder.group({ search: this.searchField })
	}

	ngOnInit(): void {
		this.searchField.valueChanges.pipe(
			debounceTime(DEBOUNCE_DELAY),
			filter(term => term !== ""),
			takeUntil(this.destroy$)
		).subscribe(listName => this.store.dispatch(loadTodos({ listName })));

		this.error$.pipe(
			distinctUntilChanged(),
			filter(error => error !== ""),
			takeUntil(this.destroy$)
		).subscribe((error) => this._snackBar.open(String(error), "Close"))
	}

	ngOnDestroy() {
		this.destroy$.next();
	}

	delete(listName: string, todo: TodoItem) {
		this.store.dispatch(deleteTodo({ listName, id: todo.id }))
	}
}
