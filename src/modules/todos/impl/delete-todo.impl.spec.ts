import { WritableGateway } from "../../shared/entity.gateway";
import Todo from "../entities/todo";

import DeleteTodoImpl from "./delete-todo.impl"

const randomId = "randomId";
const listName = "my list";
const todo = new Todo(randomId, listName, "test description", new Date(), new Date())

describe("[DeleteTodo] Success Cases", () => {

	const mockSuccessGateway: WritableGateway<Todo> = {
		save: (item: Todo) => Promise.resolve(item),
		delete: (_: string) => Promise.resolve(todo),
	}

	const deleteTodo: DeleteTodoImpl = new DeleteTodoImpl(mockSuccessGateway);

	it("should return a the mocked todo in a valid DeleteTodoResponse object", async () => {

		const result = await deleteTodo.execute({ id: randomId, listName })

		expect(result).toEqual({
			item: {
				id: todo.id,
				description: todo.description,
				start: todo.start.toISOString(),
				end: todo.end.toISOString()
			}
		});
		expect.assertions(1);
	})
})

describe("[DeleteTodo] Fail Cases", () => {

	const errorMessage = "Todo does not exist!"

	const mockFailureGateway: WritableGateway<Todo> = {
		save: (_: Todo) => Promise.reject(new Error(errorMessage)),
		delete: (_: string) => Promise.reject(new Error(errorMessage))
	}

	const deleteTodo: DeleteTodoImpl = new DeleteTodoImpl(mockFailureGateway);

	it("should return throw an error with the gateways message", async () => {
		try {
			await deleteTodo.execute({ id: randomId, listName })
		} catch (error) {
			expect(error.message).toEqual(errorMessage)
			expect.assertions(1);
		}
	})
})
