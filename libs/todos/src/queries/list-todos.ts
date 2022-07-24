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

export interface TodoItem {
	id: string;
	start: string;
	end: string;
	expired: boolean;
	description: string;
}

// query handler
export interface ListTodos {
	execute(input: ListTodosRequest): Promise<ListTodosResponse>;
}
