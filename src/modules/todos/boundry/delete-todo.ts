export interface DeleteTodo {
    execute(request: DeleteTodoRequest): Promise<DeleteTodoResponse>;
}

export interface DeleteTodoRequest {
		listName: string;
    id: string;
}

export interface DeleteTodoResponse {
    item: TodoItem
}

export interface TodoItem {
	id: string;
	start: string;
	end: string;
	description: string;
}
