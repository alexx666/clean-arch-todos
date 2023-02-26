import { Todo, List, ListRepository, LocalLazyMediator, TODO_REMOVED, DeleteTodo } from "@todos/core";
import { randomUUID } from "crypto";

import { DeleteTodoHandler } from "./delete-todo.handler";
import { TodoRemovedHandler } from "./todo-removed.handler";


const listName = "my list";
const todo = new Todo({
	id: "uuid-1",
	description: "test description",
	startDate: new Date(),
	endDate: new Date(),
	listName,
});
const todos = new Array<Todo>();
todos.push(todo);
const list = new List({
	id: randomUUID(),
	name: listName,
	todos,
	maxTodos: 10,
	allowDuplicates: false,
	allowExpired: true,
});

describe("[DeleteTodo] Success Cases", () => {
	const mockSuccessGateway: ListRepository = {
		findByName: (_: string) => Promise.resolve(list)
	};

	const mediator = new LocalLazyMediator();

	beforeAll(() => {
		mediator.on({ command: TODO_REMOVED, useFactory: () => new TodoRemovedHandler() });
	})

	const deleteTodoHandler = new DeleteTodoHandler(mediator, mockSuccessGateway, { generate: () => randomUUID() });

	it("should return a the mocked todo in a valid DeleteTodoResponse object", async () => {
		const result = await deleteTodoHandler.execute(new DeleteTodo(randomUUID(), { id: "uuid-1", listName }));

		expect(result).toBeUndefined();
	});
});
