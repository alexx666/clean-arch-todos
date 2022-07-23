import { ListRepository } from "../../ports/list.repository";

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

	constructor(private todos: ListRepository) { }

	public async execute(input: ListTodosRequest): Promise<ListTodosResponse> {
		const list = await this.todos.get(input.listName)

		const items = list.items.map((t, i) => ({
			id: t.id,
			description: t.description,
			start: t.startDate.toISOString(),
			end: t.endDate.toISOString(),
			expired: t.isExpired,
		}))

		return { items, count: list.size, listName: input.listName }
	}
}
