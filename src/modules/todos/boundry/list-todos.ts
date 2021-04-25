export interface ListTodosRequest {
		listName: string;
    limit: number;
		marker?: string;
}

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

export interface ListTodos {
    /**
     * Lists all todos that satisfy the query
     * @param input ListTodosInput
     * @returns Promise which when resolved will provide a ListTodosOutput
     */
    execute(input: ListTodosRequest): Promise<ListTodosResponse>;
}
