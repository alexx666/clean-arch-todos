import { createFeatureSelector, createSelector } from "@ngrx/store";
import { todosFeatureKey } from "./todos.reducer";
import { TodoFeatureState } from "./todos.state";

// feature selector
export const selectTodosState = createFeatureSelector<TodoFeatureState>(todosFeatureKey);

// child selectors
export const selectTodos = createSelector(
	selectTodosState,
	(state) => state.items
);
export const selectLoading = createSelector(
	selectTodosState,
	(state) => state.loading
);

// view model selector
export const selectTodosListPageViewModel = createSelector(
	selectTodos,
	selectLoading,
	(books, loading) => ({ books, loading })
);