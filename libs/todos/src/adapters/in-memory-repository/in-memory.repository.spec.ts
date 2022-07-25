import { List } from "../../entities";
import { Events, ListCreated } from "../../events";

import InMemoryTodoRepository from "./in-memory.repository";

const listName = "my list";

const events: Events<any> = new Events();

describe("[InMemoryTodoGateway] Test Cases", () => {

	let inMemTodoGW: InMemoryTodoRepository;

	const list = new List({ name: listName, maxTodos: 10, allowDuplicates: false, allowExpired: true });

	events.push(new ListCreated(list));

	beforeEach(() => {
		inMemTodoGW = new InMemoryTodoRepository(events);
	})

	it("should return matching list", async () => {
		const result = await inMemTodoGW.findById(listName)
		expect(result).toEqual(list)
		expect.assertions(1)
	})

})
