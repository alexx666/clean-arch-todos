import { List, Todo } from "../../entities";
import { ListRepository } from "../../ports";
import { DeleteTodoImpl } from "./delete-todo"
import { CryptoUuid, InMemoryPublisher } from "../../adapters";

const listName = "my list";
const todo = new Todo({ id: "uuid-1", description: "test description", startDate: new Date(), endDate: new Date(), listName });
const todos = new Array<Todo>()
todos.push(todo);
const list = new List({ name: listName, todos, maxTodos: 10, allowDuplicates: false, allowExpired: true });

describe("[DeleteTodo] Success Cases", () => {

	const mockSuccessGateway: ListRepository = {
		findById: (_: string) => Promise.resolve(list),
	}

	const providers = {
		repository: mockSuccessGateway,
		uuidProvider: new CryptoUuid(),
		publisher: new InMemoryPublisher()
	}

	const deleteTodo: DeleteTodoImpl = new DeleteTodoImpl(providers);

	it("should return a the mocked todo in a valid DeleteTodoResponse object", async () => {

		const result = await deleteTodo.execute({ id: "uuid-1", listName })

		expect(result).toBeUndefined();
		expect.assertions(1);
	})
})
