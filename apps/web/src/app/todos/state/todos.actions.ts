import { TodoItem } from "@alexx666/todos";
import { createAction, props } from "@ngrx/store";

export const loadTodos = createAction("[TODO] Load Todos");
export const todosLoaded = createAction("[TODO] Todos Loaded", props<{ items: TodoItem[] }>());
