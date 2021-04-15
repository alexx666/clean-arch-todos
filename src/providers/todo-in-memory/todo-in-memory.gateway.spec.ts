import { Todo } from "../../modules/todos/entities/todo";
import TodoDocument from "./todo-document";
import InMemoryTodoGateway from "./todo-in-memory.gateway";

describe("[InMemoryTodoGateway] Initialization", () => {
	it("should create an in memory todo gateway without any todos", async () => {
		const inMemTodoGW = new InMemoryTodoGateway()
		const todos = await inMemTodoGW.find({ limit: 10, skip: 0 })
		expect(todos.length).toEqual(0)
		expect.assertions(1)
	})
})

describe("[InMemoryTodoGateway] Test Cases", () => {

	let inMemTodoGW: InMemoryTodoGateway

	beforeEach(() => {
		const seed = new Map<string, TodoDocument>([
			["1", new TodoDocument("first", new Date().toISOString())],
			["2", new TodoDocument("second", new Date().toISOString())],
			["3", new TodoDocument("third", new Date().toISOString())],
		])

		inMemTodoGW = new InMemoryTodoGateway(seed);
	})

	it("should return all items in map as todos", async () => {
		const todos = await inMemTodoGW.find({ limit: 10, skip: 0 })
		expect(todos.length).toEqual(3)
		expect.assertions(1)
	})

	it("should return second todo", async () => {
		expect.assertions(2)
		const todos = await inMemTodoGW.find({ limit: 1, skip: 1 })
		expect(todos.length).toEqual(1)
		expect(todos[0].id).toEqual("2")
	})

	it("should add a new todo and return it", async () => {
		const todo = await inMemTodoGW.save(new Todo("4", "forth", new Date()));
		const todos = await inMemTodoGW.find({ limit: 1, skip: 3 })
		expect(todos.length).toEqual(1)
		expect(todos[0]).toEqual(todo)
		expect.assertions(2)
	})

	it("should throw an error because the todo already exist", async () => {
		try {
			const _ = await inMemTodoGW.save(new Todo("1", "description", new Date()));
		} catch (error) {
			expect(error.message).toEqual("Todo already exists!");
			expect.assertions(1)
		}
	})

	it("should remove a todo and return its value", async () => {
		const todo = await inMemTodoGW.delete("3");
		const todos = await inMemTodoGW.find({ limit: 10, skip: 0 })
		expect(todos).not.toContain(todo)
		expect(todos.length).toEqual(2)
		expect.assertions(2)
	})

	it("should throw an error because the todo does not exist", async () => {
		try {
			const _ = await inMemTodoGW.delete("4");
		} catch (error) {
			expect(error.message).toEqual("Todo does not exist!");
			expect.assertions(1)
		}
	})

})
