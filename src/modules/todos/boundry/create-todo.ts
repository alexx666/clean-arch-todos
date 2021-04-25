export interface CreateTodo {
    execute(request: CreateTodoRequest): Promise<CreateTodoResponse>;
}

export interface CreateTodoRequest {
    description: string;
    start: string;
		end: string;
		listName: string;
}

export interface CreateTodoResponse {
    id: string;
}
