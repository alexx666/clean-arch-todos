import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { BehaviorSubject, debounceTime, filter, Subscription } from 'rxjs';

import { loadTodos } from '../state/todos.actions';
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

	displayedColumns: string[] = ['id', 'description', 'start', 'end', 'expired'];

	loading$ = this.store.select(selectLoading);
	items$ = this.store.select(selectTodos);

	private subscription: Subscription;

	constructor(private readonly store: Store<TodoFeatureState>) {
		this.subscription = this.listName$.pipe(
			debounceTime(300),
			filter((value) => value !== ""),
		).subscribe((listName) => this.store.dispatch(loadTodos({ listName })));
	}

	ngOnInit(): void { }

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	onSearchChange(term: any) {
		this.listName$.next(term.target.value);
	}
}
