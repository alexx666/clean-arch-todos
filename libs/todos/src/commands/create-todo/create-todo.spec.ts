import ListPolicy from "../../entities/list-policy/list-policy";
import List from "../../entities/list/list";
import Todo from "../../entities/todo/todo";

import { CreateTodoImpl } from "../create-todo/create-todo";
import { ListRepository } from "../../ports/list.repository";
import Name from "../../value-objects/list-name";
import UuidV4 from "../../adapters/uuid-v4";

const errorMessage = "Todo already exists!"
const now = new Date(Date.now() + 3600)
const listName = Name.create("my list");
const request = {
	listName: listName.value,
	description: "test description",
	start: now.toISOString(),
	end: now.toISOString()
}

const todos = new Array<Todo>();

const policy = new ListPolicy();

const list = new List(listName, policy, todos)

const mockSuccessGateway: ListRepository = {
	get: (_: string) => Promise.resolve(list),
	create: (_: List) => Promise.resolve(),
	update: (_: List) => Promise.resolve(),
}

const mockFailureGateway: ListRepository = {
	get: (_: string) => Promise.reject(new Error(errorMessage)),
	create: (_: List) => Promise.reject(new Error(errorMessage)),
	update: (_: List) => Promise.reject(new Error(errorMessage)),
}

const providers = {
	repository: mockSuccessGateway,
	uuidProvider: new UuidV4(),
}

describe("[CreateTodo] Success Cases", () => {

	const createTodo: CreateTodoImpl = new CreateTodoImpl(providers);

	it("should return a the mocked todo in a valid CreateTodoResponse object", async () => {
		await createTodo.execute(request)

		expect(todos.length).toEqual(1);
		expect.assertions(1);
	})
})

describe("[CreateTodo] Fail Cases", () => {

	const createTodo: CreateTodoImpl = new CreateTodoImpl(providers);

	it("should return throw an error with the gateways message", async () => {
		try {
			await createTodo.execute(request)
		} catch (error) {
			expect((error as Error).message).toEqual(errorMessage)
			expect.assertions(1);
		}
	})
})
