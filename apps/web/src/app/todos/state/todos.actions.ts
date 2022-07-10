import { createAction, props } from "@ngrx/store";
import { TodoItem } from "./todos.state";

export const loadTodos = createAction("[TODO] Load Todos");
export const todosLoaded = createAction("[TODO] Todos Loaded", props<{ items: Array<TodoItem> }>());
