import { ListRepository } from "../../ports/list.repository";

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

// FIXME: interface similar to TodoParameters
interface TodoItem {
	id: string;
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
			start: deletedTodo.startDate.toISOString(),
			end: deletedTodo.endDate.toISOString()
		}

		return { item };
	}
}
