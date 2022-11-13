import { ListRepository } from "../../ports";
import { List, Todo } from "../../entities";
import { InMemoryPublisher, CryptoUuid } from "../../adapters";

import { CreateTodoHandler } from "./create-todo.handler";
import { CreateTodo } from "./create-todo.command";

const errorMessage = "Todo already exists!";
const now = new Date(Date.now() + 3600);
const listName = "my list";

const request = {
	listName: listName,
	description: "test description",
	start: now.toISOString(),
	end: now.toISOString(),
};

const todos = new Array<Todo>();

const list = new List({
	name: listName,
	todos,
	maxTodos: 10,
	allowDuplicates: false,
	allowExpired: false,
});

const mockSuccessGateway: ListRepository = {
	findByName: (_: string) => Promise.resolve(list),
};

const mockFailureGateway: ListRepository = {
	findByName: (_: string) => Promise.reject(new Error(errorMessage)),
};

describe("[CreateTodo] Success Cases", () => {
	const createTodoHandler = new CreateTodoHandler(mockSuccessGateway, new CryptoUuid(), new InMemoryPublisher());

	it("should return a the mocked todo in a valid CreateTodoResponse object", async () => {
		await createTodoHandler.execute(new CreateTodo(request));

		expect(todos.length).toEqual(1);
		expect.assertions(1);
	});
});

describe("[CreateTodo] Fail Cases", () => {
	const createTodoHandler = new CreateTodoHandler(mockFailureGateway, new CryptoUuid(), new InMemoryPublisher());

	it("should return throw an error with the gateways message", async () => {
		try {
			await createTodoHandler.execute(new CreateTodo(request));
		} catch (error) {
			expect((error as Error).message).toEqual(errorMessage);
			expect.assertions(1);
		}
	});
});