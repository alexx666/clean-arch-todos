import { TodoItem } from "@alexx666/todos";

export interface TodoFeatureState {
	loading: boolean;
	items: TodoItem[],
	searchTerm: string;
	error: string | null;
}

