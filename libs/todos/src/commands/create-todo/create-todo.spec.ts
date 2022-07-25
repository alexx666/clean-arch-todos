import { List, Todo } from "../../entities";
import { CreateTodoImpl } from "../create-todo/create-todo";
import { ListRepository } from "../../ports";
import { InMemoryPublisher, CryptoUuid } from "../../adapters";

const errorMessage = "Todo already exists!"
const now = new Date(Date.now() + 3600)
const listName = "my list";
const request = {
	listName: listName,
	description: "test description",
	start: now.toISOString(),
	end: now.toISOString()
}

const todos = new Array<Todo>();

const list = new List({ name: listName, todos, maxTodos: 10, allowDuplicates: false, allowExpired: false })

const mockSuccessGateway: ListRepository = {
	findById: (_: string) => Promise.resolve(list)
}

const mockFailureGateway: ListRepository = {
	findById: (_: string) => Promise.reject(new Error(errorMessage))
}

const failureProviders = {
	repository: mockFailureGateway,
	uuidProvider: new CryptoUuid(),
	publisher: new InMemoryPublisher()
}

const successProviders = {
	repository: mockSuccessGateway,
	uuidProvider: new CryptoUuid(),
	publisher: new InMemoryPublisher()
}

describe("[CreateTodo] Success Cases", () => {

	const createTodo: CreateTodoImpl = new CreateTodoImpl(successProviders);

	it("should return a the mocked todo in a valid CreateTodoResponse object", async () => {
		await createTodo.execute(request)

		expect(todos.length).toEqual(1);
		expect.assertions(1);
	})
})

describe("[CreateTodo] Fail Cases", () => {

	const createTodo: CreateTodoImpl = new CreateTodoImpl(failureProviders);

	it("should return throw an error with the gateways message", async () => {
		try {
			await createTodo.execute(request)
		} catch (error) {
			expect((error as Error).message).toEqual(errorMessage)
			expect.assertions(1);
		}
	})
})
