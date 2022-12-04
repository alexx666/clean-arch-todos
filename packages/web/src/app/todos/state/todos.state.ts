import { TodoItem } from "@todos/core";

export interface TodoFeatureState {
	loading: boolean;
	items: TodoItem[],
	searchTerm: string;
	error: string | null;
}

