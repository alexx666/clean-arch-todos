import TodoDao from "../../ports/todo.dao";

export interface ListTodosRequest {
	listName: string;
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
	execute(input: ListTodosRequest): Promise<ListTodosResponse>;
}

export class ListTodosImpl implements ListTodos {

	constructor(private todos: TodoDao) { }

	public async execute(input: ListTodosRequest): Promise<ListTodosResponse> {
		const items = await this.todos.find(input.listName);

		return {
			items,
			count: items.length,
			listName: input.listName
		}
	}
}
