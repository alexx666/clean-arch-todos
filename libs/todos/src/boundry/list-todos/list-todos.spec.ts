import ListPolicy from "../../entities/list-policy/list-policy";
import List from "../../entities/list/list";
import Todo from "../../entities/todo/todo";

import { ListRepository } from "../../repository/list.repository";
import Name from "../../value-objects/list-name";
import { ListTodosImpl } from "./list-todos"

const request = { listName: "my list", limit: 1, skip: 1 }

describe("[ListTodos] Success Cases", () => {

	const todo = new Todo("first", new Date(), new Date())

	const todos = new Set<Todo>();

	todos.add(todo);

	const policy = new ListPolicy()

	const list = new List(Name.create("test list"), policy, todos);

	const mockSuccessGateway: ListRepository = {
		get: (_: string) => Promise.resolve(list),
		create: (_: List) => Promise.resolve(),
		update: (_: List) => Promise.resolve()
	}

	const listTodos: ListTodosImpl = new ListTodosImpl(mockSuccessGateway);

	it("should return a the mocked todo in a valid ListTodosResponse object", async () => {
		const result = await listTodos.execute(request)

		expect(result).toEqual({
			items: [
				{
					id: 0,
					end: todo.end.toISOString(),
					start: todo.start.toISOString(),
					description: todo.description,
					expired: todo.isExpired
				}
			], count: 1, listName: "my list"
		});
		expect.assertions(1);
	})
})

describe("[ListTodos] Fail Cases", () => {

	const errorMessage = "Unexpected error!"

	const mockFailureGateway: ListRepository = {
		get: (_: string) => Promise.reject(new Error(errorMessage)),
		create: (_: List) => Promise.reject(new Error(errorMessage)),
		update: (_: List) => Promise.reject(new Error(errorMessage))
	}

	const listTodos: ListTodosImpl = new ListTodosImpl(mockFailureGateway);

	it("should return throw an error with the gateways message", async () => {
		try {
			await listTodos.execute(request)
		} catch (error) {
			expect((error as Error).message).toEqual(errorMessage)
			expect.assertions(1);
		}
	})
})
