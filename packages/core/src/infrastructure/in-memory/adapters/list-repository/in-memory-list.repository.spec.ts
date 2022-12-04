import { ListCreated } from "../../../../application";
import { List } from "../../../domain";
import { Events } from "../../../../shared";

import { InMemoryListRepository } from "./in-memory-list.repository";

const listName = "my list";

const events = new Events();

describe("[InMemoryTodoGateway] Test Cases", () => {
	let inMemTodoGW: InMemoryListRepository;

	const list = new List({
		name: listName,
		maxTodos: 10,
		allowDuplicates: false,
		allowExpired: true,
	});

	events.push(new ListCreated(list));

	beforeEach(() => {
		inMemTodoGW = new InMemoryListRepository(events);
	});

	it("should return matching list", async () => {
		const result = await inMemTodoGW.findByName(listName);
		expect(result).toBeDefined();
		expect(result).toEqual(list);
		expect.assertions(2);
	});
});
