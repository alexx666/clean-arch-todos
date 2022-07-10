import { TodoItem } from "@alexx666/todos";
import { createFeature, createReducer, on } from "@ngrx/store";
import { loadTodos, todosLoaded } from "./todos.actions";
import { TodoFeatureState } from "./todos.state";

export const todosFeatureKey = "todos";

export const initialState: TodoFeatureState = {
	loading: false,
	items: new Array<TodoItem>()
}

export const todosFeature = createFeature({
	name: todosFeatureKey,
	reducer: createReducer(initialState,
		on(loadTodos, (state) => ({ ...state, loading: true })),
		on(todosLoaded, (state, { items }) => ({ ...state, items: [...state.items, ...items], loading: false })))
});
