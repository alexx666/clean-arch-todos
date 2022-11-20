import { TodoItem } from "@alexx666/todos-core";
import { createFeature, createReducer, on } from "@ngrx/store";
import { loadTodos, todosLoaded, deleteTodo, todoDeleted, todoRequestErrored } from "./todos.actions";
import { TodoFeatureState } from "./todos.state";

export const todosFeatureKey = "todos";

export const initialState: TodoFeatureState = {
	loading: false,
	items: new Array<TodoItem>(),
	searchTerm: "",
	error: "",
}

export const todosFeature = createFeature({
	name: todosFeatureKey,
	reducer: createReducer(initialState,
		on(loadTodos, (state, { listName }) => ({ ...state, items: [], loading: true, searchTerm: listName })),
		on(todosLoaded, (state, { items }) => ({ ...state, items: (items ?? []), loading: false, error: "" })),
		on(deleteTodo, (state) => ({ ...state })),
		on(todoDeleted, (state, { id }) => ({ ...state, items: state.items.filter(todo => todo.id !== id), error: "" })),
		on(todoRequestErrored, (state, { error }) => ({ ...state, error }))
	),
});
