import ListPolicy from "../../entities/list-policy/list-policy";
import List from "../../entities/list/list";
import Todo from "../../entities/todo/todo";
import Name from "../../value-objects/list-name";
import InMemoryTodoGateway from "./in-memory.repository";

const listName = Name.create("my list");
const start = new Date()
const end = new Date(Date.now() + 3600)

describe("[InMemoryTodoGateway] Test Cases", () => {

	let inMemTodoGW: InMemoryTodoGateway;

	const todos = new Set<Todo>()
		.add(new Todo("first", start, end))
		.add(new Todo("second", start, end))
		.add(new Todo("third", start, end))

	const list = new List(listName, new ListPolicy(), todos)

	const seed = new Set<List>().add(list)

	beforeEach(() => {
		inMemTodoGW = new InMemoryTodoGateway(seed);
	})

	it("should return matching list", async () => {
		const result = await inMemTodoGW.get(listName.value)
		expect(result).toEqual(list)
		expect.assertions(1)
	})

	it("should throw an error because the todo already exist", async () => {
		try {
			await inMemTodoGW.create(list);
		} catch (error) {
			expect((error as Error).message).toEqual("List already exists!");
			expect.assertions(1)
		}
	})

})
