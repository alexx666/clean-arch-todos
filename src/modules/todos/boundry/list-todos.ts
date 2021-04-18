export interface ListTodosRequest {
    limit: number
		marker?: string
}

export interface ListTodosResponse {
    items: any[];
    count: number;
}

export interface ListTodos {
    /**
     * Lists all todos that satisfy the query
     * @param input ListTodosInput
     * @returns Promise which when resolved will provide a ListTodosOutput
     */
    execute(input: ListTodosRequest): Promise<ListTodosResponse>;
}
