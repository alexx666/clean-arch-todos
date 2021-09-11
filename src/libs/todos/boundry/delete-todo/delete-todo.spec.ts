import ListPolicy from "../../entities/list-policy/list-policy";
import List from "../../entities/list/list";
import Todo from "../../entities/todo/todo";
import { ListRepository } from "../../repository/list.repository";
import Name from "../../value-objects/list-name";

import { DeleteTodoImpl } from "./delete-todo"

const listName = Name.create("my list");
const todo = new Todo("test description", new Date(), new Date())
const todos = new Set<Todo>().add(todo);
const list = new List(listName, new ListPolicy(), todos)

describe("[DeleteTodo] Success Cases", () => {

	const mockSuccessGateway: ListRepository = {
		get: (_: string) => Promise.resolve(list),
		create: (_: List) => Promise.resolve(),
		update: (_: List) => Promise.resolve(),
	}

	const deleteTodo: DeleteTodoImpl = new DeleteTodoImpl(mockSuccessGateway);

	it("should return a the mocked todo in a valid DeleteTodoResponse object", async () => {

		const result = await deleteTodo.execute({ id: 0, listName: listName.value })

		expect(result).toEqual({
			item: {
				id: 0,
				description: todo.description,
				start: todo.start.toISOString(),
				end: todo.end.toISOString()
			}
		});
		expect.assertions(1);
	})
})
