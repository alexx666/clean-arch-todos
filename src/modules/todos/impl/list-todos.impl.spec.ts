import { ReadableGateway } from "../../shared/entity.gateway";
import Todo from "../entities/todo";

import ListTodosImpl from "./list-todos.impl"

const request = { listName: "my list", limit: 1, skip: 1 }

describe("[ListTodos] Success Cases", () => {

	const todo = new Todo("id", "my list", "first", new Date(), new Date())

	const mockSuccessGateway: ReadableGateway<Todo> = {
		find: (_: any) => Promise.resolve([todo]),
		count: (_: any) => Promise.resolve(1)
	}

	const listTodos: ListTodosImpl = new ListTodosImpl(mockSuccessGateway);

	it("should return a the mocked todo in a valid ListTodosResponse object", async () => {
		const result = await listTodos.execute(request)

		expect(result).toEqual({
			items: [
				{
					id: todo.id,
					end: todo.end.toISOString(),
					start: todo.start.toISOString(),
					description: todo.description,
					expired: todo.isExpired
				}
			], count: 1, listName: "my list" });
		expect.assertions(1);
	})
})

describe("[ListTodos] Fail Cases", () => {

	const errorMessage = "Unexpected error!"

	const mockFailureGateway: ReadableGateway<Todo> = {
		find: (_: any) => Promise.reject(new Error(errorMessage)),
		count: (_: any) => Promise.reject(new Error(errorMessage))
	}

	const listTodos: ListTodosImpl = new ListTodosImpl(mockFailureGateway);

	it("should return throw an error with the gateways message", async () => {
		try {
			await listTodos.execute(request)
		} catch (error) {
			expect(error.message).toEqual(errorMessage)
			expect.assertions(1);
		}
	})
})
