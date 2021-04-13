export interface DeleteTodo {
    execute(request: DeleteTodoRequest): Promise<DeleteTodoResponse>;
}

export interface DeleteTodoRequest {
    id: string;
}

export interface DeleteTodoResponse {
    item: any
}
