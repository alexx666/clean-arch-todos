import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { TodosService } from '../service/todos.service';
import { deleteTodo, loadTodos, todoDeleted, todosLoaded } from './todos.actions';

@Injectable()
export class TodoEffects {

	loadTodos$ = createEffect(() => this.actions$.pipe(
		ofType(loadTodos),
		mergeMap(({ listName }) => this.todoService.getTodos({ listName }).pipe(
			map((todos) => todosLoaded({ items: todos, count: todos.length, listName })),
			catchError((_) => EMPTY)
		))
	));

	deleteTodo$ = createEffect(() => this.actions$.pipe(
		ofType(deleteTodo),
		mergeMap(({ listName, id }) => this.todoService.deleteTodo({ listName, id }).pipe(
			map(({ item }) => todoDeleted({ item })),
			catchError((_) => EMPTY),
		))
	));

	constructor(
		private actions$: Actions,
		private todoService: TodosService
	) { }
}
