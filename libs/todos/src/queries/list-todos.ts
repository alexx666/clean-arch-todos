// query
export interface ListTodosRequest {
	listId: string;
}

// read model projection
export interface ListTodosResponse {
	items: TodoItem[];
	listId: string;
	count: number;
}

export interface TodoItem {
	id: string;
	start: string;
	end: string;
	expired: boolean;
	description: string;
	isDeleted: boolean;
}

// query handler
export interface ListTodos {
	execute(input: ListTodosRequest): Promise<ListTodosResponse>;
}
