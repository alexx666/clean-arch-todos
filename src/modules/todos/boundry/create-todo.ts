export interface CreateTodo {
    execute(request: CreateTodoRequest): Promise<CreateTodoResponse>;
}

export interface CreateTodoRequest {
    description: string;
    due: string;
}

export interface CreateTodoResponse extends CreateTodoRequest {
    id: string;
}
