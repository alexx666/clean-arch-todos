import { TodoItem } from "../view-model";

// query
export interface ListTodosRequest {
	listName: string;
}

// read model projection
export interface ListTodosResponse {
	items: TodoItem[];
	listName: string;
	count: number;
}

// query handler
export interface ListTodos {
	execute(input: ListTodosRequest): Promise<ListTodosResponse>;
}
