import { Todo, List, UuidGenerator, ListRepository, Mediator, TODO_ADDED, CreateTodo } from "@todos/core";
import { randomUUID } from "crypto";

import { CreateTodoHandler } from "./create-todo.handler";
import { TodoAddedHandler } from "./todo-added.handler";

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
	id: randomUUID(),
	name: listName,
	todos,
	maxTodos: 10,
	allowDuplicates: false,
	allowExpired: false,
});

const mockUuidGenerator: UuidGenerator = {
	generate: () => "randomUuid",
}

const mockSuccessGateway: ListRepository = {
	findByName: (_: string) => Promise.resolve(list)
};

const mockFailureGateway: ListRepository = {
	findByName: (_: string) => Promise.reject(new Error(errorMessage))
};

const di = new Map();
const mediator = new Mediator(di);

di.set(TODO_ADDED, new TodoAddedHandler());

describe("[CreateTodo] Success Cases", () => {

	const createTodoHandler = new CreateTodoHandler(mockSuccessGateway, mockUuidGenerator, mediator);

	it("should return a the mocked todo in a valid CreateTodoResponse object", async () => {
		await createTodoHandler.execute(new CreateTodo(randomUUID(), request));

		expect(todos.length).toEqual(1);
		expect.assertions(1);
	});
});

describe("[CreateTodo] Fail Cases", () => {
	const createTodoHandler = new CreateTodoHandler(mockFailureGateway, mockUuidGenerator, mediator);

	it("should return throw an error with the gateways message", async () => {
		try {
			await createTodoHandler.execute(new CreateTodo(randomUUID(), request));
		} catch (error) {
			expect((error as Error).message).toEqual(errorMessage);
			expect.assertions(1);
		}
	});
});