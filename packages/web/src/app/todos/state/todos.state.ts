import { TodoItem } from "@alexx666/todos-core";

export interface TodoFeatureState {
	loading: boolean;
	items: TodoItem[],
	searchTerm: string;
	error: string | null;
}

