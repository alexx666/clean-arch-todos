import { WritableGateway } from "../../shared/entity.gateway";
import UUDIGenerator from "../../shared/uuid-generator";
import { Todo } from "../entities/todo";

import CreateTodoImpl from "./create-todo.impl"

const errorMessage = "Todo already exists!"
const now = new Date()
const request = { description: "test description", due: now.toISOString() }

const mockUUIDGenerator: UUDIGenerator = {
	generate: () => "generatedId"
}

const mockSuccessGateway: WritableGateway<Todo> = {
	save: (item: Todo) => Promise.resolve(item),
	delete: (id: string) => Promise.resolve(new Todo(id, request.description, now)),
}

const mockFailureGateway: WritableGateway<Todo> = {
	save: (_: Todo) => Promise.reject(new Error(errorMessage)),
	delete: (_: string) => Promise.reject(new Error(errorMessage))
}

describe("[CreateTodo] Success Cases", () => {

	const createTodo: CreateTodoImpl = new CreateTodoImpl(mockSuccessGateway, mockUUIDGenerator);

	it("should return a the mocked todo in a valid CreateTodoResponse object", async () => {
		const insufficientRequest: any = { ...request };

		delete insufficientRequest.id

		const response = await createTodo.execute(insufficientRequest)

		expect(response).toEqual({ ...insufficientRequest, id: "generatedId" });
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
