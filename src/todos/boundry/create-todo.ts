export interface ICreateTodo {
    execute(request: CreateTodoRequest): Promise<CreateTodoResponse>;
}

export interface CreateTodoRequest {
    description: string;
}

export interface CreateTodoResponse {
    id: string;
    description: string;
    timestamp: string;
}