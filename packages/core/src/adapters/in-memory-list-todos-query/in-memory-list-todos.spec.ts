import { List, Todo } from "../../entities";
import { Events, ListCreated, TodoAdded } from "../../events";

import InMemoryListTodos from "./in-memory-list-todos.query";

const events = new Events();
const request = { listName: "my list", limit: 1, skip: 1 };

describe("[ListTodos] Success Cases", () => {
	const todo = new Todo({
		id: "uuid-1",
		description: "first",
		startDate: new Date(),
		endDate: new Date(),
		listName: request.listName,
	});

	const todos = new Array<Todo>();

	todos.push(todo);

	const list = new List({
		name: "test list",
		todos,
		maxTodos: 10,
		allowDuplicates: false,
		allowExpired: true,
	});

	events.push(new ListCreated(list), new TodoAdded(todo));

	const listTodos = new InMemoryListTodos(events);

	it("should return a the mocked todo in a valid ListTodosResponse object", async () => {
		const result = await listTodos.execute(request);

		expect(result).toEqual({
			items: [
				{
					id: todo.id,
					end: todo.endDate.toISOString(),
					start: todo.startDate.toISOString(),
					description: todo.description,
					expired: todo.isExpired,
					isDeleted: false,
				},
			],
			count: 1,
			listName: "my list",
		});
		expect.assertions(1);
	});
});

describe("[ListTodos] Fail Cases", () => {
	const errorMessage = "Unexpected error!";

	const listTodos = new InMemoryListTodos(events);

	it("should return throw an error with the gateways message", async () => {
		try {
			await listTodos.execute(request);
		} catch (error) {
			expect((error as Error).message).toEqual(errorMessage);
			expect.assertions(1);
		}
	});
});
