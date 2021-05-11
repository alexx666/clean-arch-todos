import ListPolicy from "../../entities/list-policy/list-policy";
import List from "../../entities/list/list";
import Todo from "../../entities/todo/todo";

import { CreateTodoImpl } from "../create-todo/create-todo";
import { ListRepository } from "../../repository/list.repository";

const errorMessage = "Todo already exists!"
const now = new Date(Date.now() + 3600)
const listName = "my list";
const request = {
	listName,
	description: "test description",
	start: now.toISOString(),
	end: now.toISOString()
}

const todos = new Set<Todo>();

const policy = new ListPolicy();

const list = new List(listName, policy, todos)

const mockSuccessGateway: ListRepository = {
	get: (_: string) => Promise.resolve(list),
	save: (_: List) => Promise.resolve(),
}

const mockFailureGateway: ListRepository = {
	get: (_: string) => Promise.reject(new Error(errorMessage)),
	save: (_: List) => Promise.reject(new Error(errorMessage)),
}

describe("[CreateTodo] Success Cases", () => {

	const createTodo: CreateTodoImpl = new CreateTodoImpl(mockSuccessGateway);

	it("should return a the mocked todo in a valid CreateTodoResponse object", async () => {
		await createTodo.execute(request)

		expect(todos.size).toEqual(1);
		expect.assertions(1);
	})
})

describe("[CreateTodo] Fail Cases", () => {

	const createTodo: CreateTodoImpl = new CreateTodoImpl(mockFailureGateway);

	it("should return throw an error with the gateways message", async () => {
		try {
			await createTodo.execute(request)
		} catch (error) {
			expect(error.message).toEqual(errorMessage)
			expect.assertions(1);
		}
	})
})
