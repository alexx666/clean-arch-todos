import ListPolicy from "../../entities/list-policy/list-policy";
import List from "../../entities/list/list";
import Todo from "../../entities/todo/todo";
import { ListRepository } from "../../repository/list.repository";
import Name from "../../value-objects/list-name";

import { DeleteTodoImpl } from "./delete-todo"

const listName = Name.create("my list");
const todo = new Todo({ id: "uuid-1", description: "test description", startDate: new Date(), endDate: new Date() })
const todos = new Array<Todo>()
todos.push(todo);
const list = new List(listName, new ListPolicy(), todos)

describe("[DeleteTodo] Success Cases", () => {

	const mockSuccessGateway: ListRepository = {
		get: (_: string) => Promise.resolve(list),
		create: (_: List) => Promise.resolve(),
		update: (_: List) => Promise.resolve(),
	}

	const deleteTodo: DeleteTodoImpl = new DeleteTodoImpl(mockSuccessGateway);

	it("should return a the mocked todo in a valid DeleteTodoResponse object", async () => {

		const result = await deleteTodo.execute({ id: "uuid-1", listName: listName.value })

		expect(result).toEqual({
			item: {
				id: todo.id,
				description: todo.description,
				start: todo.startDate.toISOString(),
				end: todo.endDate.toISOString()
			}
		});
		expect.assertions(1);
	})
})
