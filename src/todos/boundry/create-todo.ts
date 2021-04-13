export interface CreateTodo {
    execute(request: CreateTodoRequest): Promise<CreateTodoResponse>;
}

export interface CreateTodoRequest {
    id?: string;
    description: string;
    timestamp?: string;
}

export interface CreateTodoResponse {
    id: string;
    description: string;
    timestamp: string;
}