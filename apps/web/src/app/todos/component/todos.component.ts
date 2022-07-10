import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";

import { loadTodos } from '../state/todos.actions';
import { selectLoading, selectTodos } from '../state/todos.selector';
import { TodoFeatureState } from '../state/todos.state';

@Component({
	selector: 'app-todos',
	templateUrl: './todos.component.html',
	styleUrls: ['./todos.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosComponent implements OnInit {

	loading$ = this.store.select(selectLoading);
	items$ = this.store.select(selectTodos);

	constructor(private readonly store: Store<TodoFeatureState>) { }

	ngOnInit(): void {
		this.store.dispatch(loadTodos());
	}

}
