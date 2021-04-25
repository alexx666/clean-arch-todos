import { ReadableGateway } from "../../shared/entity.gateway";
import { ListTodos, ListTodosRequest, ListTodosResponse } from "../boundry/list-todos";
import Todo from "../entities/todo";

export default class ListTodosImpl implements ListTodos {

    constructor(private gateway: ReadableGateway<Todo>) {}

    public async execute(input: ListTodosRequest): Promise<ListTodosResponse> {
        const todos = await this.gateway.find(input)

				const items = todos.map(t => ({
					id: t.id,
					description: t.description,
					start: t.start.toISOString(),
					end: t.end.toISOString(),
					expired: t.isExpired,
				}))

        return { items, count: todos.length, listName: input.listName }
    }
}
