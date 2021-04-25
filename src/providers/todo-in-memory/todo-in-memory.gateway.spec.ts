import Todo from "../../modules/todos/entities/todo";
import TodoDocument from "./todo-document";
import InMemoryTodoGateway from "./todo-in-memory.gateway";

const description = "description";
const listName = "my list";
const start = new Date()
const end = new Date(Date.now() + 3600)

describe("[InMemoryTodoGateway] Initialization", () => {
	it("should create an in memory todo gateway without any todos", async () => {
		const inMemTodoGW = new InMemoryTodoGateway()
		const todos = await inMemTodoGW.find({ listName, limit: 10 })
		expect(todos.length).toEqual(0)
		expect.assertions(1)
	})
})

describe("[InMemoryTodoGateway] Test Cases", () => {

	let inMemTodoGW: InMemoryTodoGateway

	beforeEach(() => {
		const seed = new Map<string, TodoDocument>([
			["1", new TodoDocument(listName, "first", start.toISOString(), end.toISOString())],
			["2", new TodoDocument(listName, "second", start.toISOString(), end.toISOString())],
			["3", new TodoDocument(listName, "third", start.toISOString(), end.toISOString())],
		])

		inMemTodoGW = new InMemoryTodoGateway(seed);
	})

	it("should return all items in map as todos", async () => {
		const todos = await inMemTodoGW.find({ listName, limit: 10 })
		expect(todos.length).toEqual(3)
		expect.assertions(1)
	})

	it("should return second todo", async () => {
		const todos = await inMemTodoGW.find({ listName, limit: 1, marker: "1" })
		expect(todos.length).toEqual(1)
		expect(todos[0].id).toEqual("2")
		expect.assertions(2)
	})

	it("should add a new todo and return it", async () => {
		const newTodo = new Todo(listName, "4", "forth", start, end)
		const savedTodo = await inMemTodoGW.save(newTodo);
		expect(savedTodo).toEqual(newTodo)
		expect.assertions(1)
	})

	it("should throw an error because the todo already exist", async () => {
		try {
			const _ = await inMemTodoGW.save(new Todo("1", listName, description, start, end));
		} catch (error) {
			expect(error.message).toEqual("Todo already exists!");
			expect.assertions(1)
		}
	})

	it("should remove a todo and return its value", async () => {
		const todo = await inMemTodoGW.delete(listName, "3");
		const todos = await inMemTodoGW.find({ listName, limit: 10 })
		expect(todos).not.toContain(todo)
		expect(todos.length).toEqual(2)
		expect.assertions(2)
	})

	it("should throw an error because the todo does not exist", async () => {
		try {
			const _ = await inMemTodoGW.delete(listName, "4");
		} catch (error) {
			expect(error.message).toEqual("Todo does not exist!");
			expect.assertions(1)
		}
	})

})
