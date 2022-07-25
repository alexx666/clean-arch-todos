import { List } from "../../entities";
import { Event, ListCreated } from "../../events";
import InMemoryTodoGateway from "./in-memory.repository";

const listName = "my list";

const events: Event<List>[] = [];

describe("[InMemoryTodoGateway] Test Cases", () => {

	let inMemTodoGW: InMemoryTodoGateway;

	const list = new List({ name: listName, maxTodos: 10, allowDuplicates: false, allowExpired: true });

	events.push(new ListCreated(list));

	beforeEach(() => {
		inMemTodoGW = new InMemoryTodoGateway(events);
	})

	it("should return matching list", async () => {
		const result = await inMemTodoGW.findById(listName)
		expect(result).toEqual(list)
		expect.assertions(1)
	})

})
