import { DeleteTodoParameters, ListTodosRequest, ListTodosResponse } from "@alexx666/todos-core";
import { createAction, props } from "@ngrx/store";

export enum TodoActionTypes {
	LOAD_TODO = "[TODO] Load Todos",
	TODOS_LOADED = "[TODO] Todos Loaded",
	DELETE_TODOS = "[TODO] Delete Todo",
	TODOS_DELETED = "[TODO] Todo Deleted",
	TODO_REQUEST_FAILED = "[TODO] Todo Request Error",
}

export const loadTodos = createAction(TodoActionTypes.LOAD_TODO, props<ListTodosRequest>());
export const todosLoaded = createAction(TodoActionTypes.TODOS_LOADED, props<Partial<ListTodosResponse>>());

export const deleteTodo = createAction(TodoActionTypes.DELETE_TODOS, props<DeleteTodoParameters>());
export const todoDeleted = createAction(TodoActionTypes.TODOS_DELETED, props<DeleteTodoParameters>());

export const todoRequestErrored = createAction(TodoActionTypes.TODO_REQUEST_FAILED, props<{ error: string }>());
