import { ReadableGateway } from "../../shared/entity.gateway";
import { Todo } from "../entities/todo";

import ListTodosImpl from "./list-todos.impl"

const now = new Date()

const todo = new Todo("1", "first", now)

const mockGateway: ReadableGateway<Todo> = {
	find: (_: any) => Promise.resolve([todo])
}

const listTodos: ListTodosImpl = new ListTodosImpl(mockGateway);

describe("ListTodos Use Case", () => {

	it("should return a the mocked todo in a valid ListTodosResponse object", async () => {
		const result = await listTodos.execute({ limit: 1 })

		expect(result).toEqual({ items: [todo], count: 1 });
	})

})
