import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { TodosService } from '../service/todos.service';
import { loadTodos, todosLoaded } from './todos.actions';

@Injectable()
export class TodoEffects {

	loadTodos$ = createEffect(() => this.actions$.pipe(
		ofType(loadTodos),
		mergeMap(() => this.todoService.getTodos({
			listName: 'my-list' // FIXME: hardcoded
		}).pipe(
			map((todos) => todosLoaded({ items: todos })),
			catchError((_) => EMPTY)
		))
	));

	constructor(
		private actions$: Actions,
		private todoService: TodosService
	) { }
}
