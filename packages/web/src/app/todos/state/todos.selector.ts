import { createFeatureSelector, createSelector } from "@ngrx/store";
import { todosFeatureKey } from "./todos.reducer";
import { TodoFeatureState } from "./todos.state";

// feature selector
export const selectTodosState = createFeatureSelector<TodoFeatureState>(todosFeatureKey);

// child selectors
export const selectTodos = createSelector(
	selectTodosState,
	(state) => state.items.filter(item => !item.isDeleted)
);

export const selectDeletedTodos = createSelector(
	selectTodosState,
	(state) => state.items.filter(item => item.isDeleted)
)

export const selectLoading = createSelector(
	selectTodosState,
	(state) => state.loading
);

export const selectSearchTerm = createSelector(
	selectTodosState,
	(state) => state.searchTerm
);

export const selectError = createSelector(
	selectTodosState,
	(state) => state.error,
)
