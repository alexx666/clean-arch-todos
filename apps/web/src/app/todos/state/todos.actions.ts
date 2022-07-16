import { DeleteTodoRequest, DeleteTodoResponse, ListTodosRequest, ListTodosResponse } from "@alexx666/todos";
import { createAction, props } from "@ngrx/store";


export const loadTodos = createAction("[TODO] Load Todos", props<ListTodosRequest>());
export const todosLoaded = createAction("[TODO] Todos Loaded", props<ListTodosResponse>());

export const deleteTodo = createAction("[TODO] Delete Todo", props<DeleteTodoRequest>());
export const todoDeleted = createAction("[TODO] Todo Deleted", props<DeleteTodoResponse>());
