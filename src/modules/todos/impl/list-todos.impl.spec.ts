import { ReadableGateway } from "../../shared/entity.gateway";
import { Todo } from "../entities/todo";

import ListTodosImpl from "./list-todos.impl"

describe("[ListTodos] Success Cases", () => {

	const todo = new Todo("id", "first", new Date())

	const mockSuccessGateway: ReadableGateway<Todo> = {
		find: (_: any) => Promise.resolve([todo])
	}

	const listTodos: ListTodosImpl = new ListTodosImpl(mockSuccessGateway);

	it("should return a the mocked todo in a valid ListTodosResponse object", async () => {
		expect.assertions(1);

		const result = await listTodos.execute({ limit: 1 })

		expect(result).toEqual({ items: [todo], count: 1 });
	})
})

describe("[ListTodos] Fail Cases", () => {

	const errorMessage = "Unexpected error!"

	const mockFailureGateway: ReadableGateway<Todo> = {
		find: (_: any) => Promise.reject(new Error(errorMessage))
	}

	const listTodos: ListTodosImpl = new ListTodosImpl(mockFailureGateway);

	it("should return throw an error with the gateways message", async () => {
		expect.assertions(1);
		try {
			await listTodos.execute({ limit: 1 })
		} catch (error) {
			expect(error.message).toEqual(errorMessage)
		}
	})
})
