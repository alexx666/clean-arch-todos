import { TodoItem } from "@alexx666/todos";
import { createAction, props } from "@ngrx/store";

export const loadTodos = createAction("[TODO] Load Todos", props<{ listName: string }>());
export const todosLoaded = createAction("[TODO] Todos Loaded", props<{ items: TodoItem[] }>());
