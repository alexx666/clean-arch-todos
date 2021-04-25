import { Gateway } from "../../shared/entity.gateway";
import UUDIGenerator from "../../shared/uuid-generator";
import Todo from "../entities/todo";

import CreateTodoImpl from "./create-todo.impl"

const errorMessage = "Todo already exists!"
const now = new Date(Date.now() + 3600)
const listName = "my list";
const request = {
	listName,
	description: "test description",
	start: now.toISOString(),
	end: now.toISOString()
}

const mockUUIDGenerator: UUDIGenerator = {
	generate: () => "generatedId"
}

const mockSuccessGateway: Gateway<Todo> = {
	save: (item: Todo) => Promise.resolve(item),
	find: (_: any) => Promise.resolve([]),
	count: (_: any) => Promise.resolve(0),
	delete: (id: string) => Promise.resolve(new Todo(id, listName, request.description, now, now)),
}

const mockFailureGateway: Gateway<Todo> = {
	save: (_: Todo) => Promise.reject(new Error(errorMessage)),
	find: (_: any) => Promise.reject(new Error(errorMessage)),
	count: (_: any) => Promise.reject(new Error(errorMessage)),
	delete: (_: string) => Promise.reject(new Error(errorMessage))
}

describe("[CreateTodo] Success Cases", () => {

	const createTodo: CreateTodoImpl = new CreateTodoImpl(mockSuccessGateway, mockUUIDGenerator);

	it("should return a the mocked todo in a valid CreateTodoResponse object", async () => {
		const insufficientRequest: any = { ...request };

		delete insufficientRequest.id

		const response = await createTodo.execute(insufficientRequest)

		expect(response).toEqual({ id: "generatedId" });
		expect.assertions(1);
	})
})

describe("[CreateTodo] Fail Cases", () => {

	const createTodo: CreateTodoImpl = new CreateTodoImpl(mockFailureGateway, mockUUIDGenerator);

	it("should return throw an error with the gateways message", async () => {
		try {
			await createTodo.execute(request)
		} catch (error) {
			expect(error.message).toEqual(errorMessage)
			expect.assertions(1);
		}
	})
})
