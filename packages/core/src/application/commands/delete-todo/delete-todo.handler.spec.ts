import { List, Todo } from "../../../domain";
import { ListRepository } from "../../../ports";
import { DeleteTodoHandler } from "./delete-todo.handler";
import { DeleteTodo } from "./delete-todo.command";
import { Mediator } from "../../../infrastructure";
import { TodoRemovedHandler } from "./todo-removed.handler";
import { TODO_REMOVED } from "./todo-removed.event";

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

	const di = new Map();
	const mediator = new Mediator(di);

	beforeAll(() => {
		di.set(TODO_REMOVED, new TodoRemovedHandler());
	})

	const deleteTodoHandler: DeleteTodoHandler = new DeleteTodoHandler(mediator, mockSuccessGateway);

	it("should return a the mocked todo in a valid DeleteTodoResponse object", async () => {
		const result = await deleteTodoHandler.execute(new DeleteTodo({ id: "uuid-1", listName }));

		expect(result).toBeUndefined();
		expect.assertions(1);
	});
});
