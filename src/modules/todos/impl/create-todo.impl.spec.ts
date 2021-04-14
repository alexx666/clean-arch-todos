import { WritableGateway } from "../../shared/entity.gateway";
import UUDIGenerator from "../../shared/uuid-generator";
import { Todo } from "../entities/todo";

import CreateTodoImpl from "./create-todo.impl"

const now = new Date()
const request = { id: "testId", description: "test description", due: now.toISOString() }

describe("[CreateTodo] API call (no generatorId) - Success Cases", () => {

	const mockSuccessGateway: WritableGateway<Todo> = {
		save: (item: Todo) => Promise.resolve(item),
		delete: (_: string) => Promise.resolve(new Todo(request.id, request.description, now)),
	}

	const createTodo: CreateTodoImpl = new CreateTodoImpl(mockSuccessGateway);

	it("should return a the mocked todo in a valid CreateTodoResponse object", async () => {
		expect.assertions(1);

		const response = await createTodo.execute(request)

		expect(response).toEqual(request);
	})
})

describe("[CreateTodo] CLI call - Success Cases", () => {

	const mockUUIDGenerator: UUDIGenerator = {
		generate: () => "generatedId"
	}

	const mockSuccessGateway: WritableGateway<Todo> = {
		save: (item: Todo) => Promise.resolve(item),
		delete: (_: string) => Promise.resolve(new Todo(request.id, request.description, now)),
	}

	const createTodo: CreateTodoImpl = new CreateTodoImpl(mockSuccessGateway, mockUUIDGenerator);

	it("should return a the mocked todo in a valid CreateTodoResponse object", async () => {
		expect.assertions(1);

		const insufficientRequest: any = { ...request };

		delete insufficientRequest.id

		const response = await createTodo.execute(insufficientRequest)

		expect(response).toEqual({ ...insufficientRequest, id: "generatedId" });
	})
})

describe("[CreateTodo] Fail Cases", () => {

	const errorMessage = "Todo already exists!"

	const mockFailureGateway: WritableGateway<Todo> = {
		save: (_: Todo) => Promise.reject(new Error(errorMessage)),
		delete: (_: string) => Promise.reject(new Error(errorMessage))
	}

	const createTodo: CreateTodoImpl = new CreateTodoImpl(mockFailureGateway);

	it("should return throw an error with the gateways message", async () => {
		expect.assertions(1);
		try {
			await createTodo.execute(request)
		} catch (error) {
			expect(error.message).toEqual(errorMessage)
		}
	})

	it("should return throw an error due to insufficient data provided to create Todo", async () => {
		expect.assertions(1);
		try {
			const insufficientRequest: any = { ...request };

			delete insufficientRequest.id;

			await createTodo.execute(insufficientRequest)
		} catch (error) {
			expect(error.message).toEqual("No way to generate ID. Provide ID in request or a UUID generator service!")
		}
	})
})
