import { DeleteTodoRequest, DeleteTodoResponse, ListTodosRequest, ListTodosResponse } from "@alexx666/todos";
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

export const deleteTodo = createAction(TodoActionTypes.DELETE_TODOS, props<DeleteTodoRequest>());
export const todoDeleted = createAction(TodoActionTypes.TODOS_DELETED, props<DeleteTodoResponse>());

export const todoRequestErrored = createAction(TodoActionTypes.TODO_REQUEST_FAILED, props<{ error: string }>());
