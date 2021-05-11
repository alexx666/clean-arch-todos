import { ListRepository } from "../../repository/list.repository";

export interface DeleteTodo {
	execute(request: DeleteTodoRequest): Promise<DeleteTodoResponse>;
}

export interface DeleteTodoRequest {
	listName: string;
	id: number;
}

export interface DeleteTodoResponse {
	item: TodoItem
}

interface TodoItem {
	id: number;
	start: string;
	end: string;
	description: string;
}

export class DeleteTodoImpl implements DeleteTodo {

	constructor(private todos: ListRepository) { }

	public async execute(request: DeleteTodoRequest): Promise<DeleteTodoResponse> {

		const { listName, id } = request;

		const list = await this.todos.get(listName);

		const deletedTodo = list.remove(id)

		const item = {
			id,
			description: deletedTodo.description,
			start: deletedTodo.start.toISOString(),
			end: deletedTodo.end.toISOString()
		}

		return { item };
	}
}
