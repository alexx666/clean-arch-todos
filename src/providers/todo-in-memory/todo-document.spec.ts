import Todo from "../../modules/todos/entities/todo";

import TodoDocument from "./todo-document";

const notDefined: any = undefined;
const description = "description";
const listName = "my list";
const start = new Date()
const end = new Date(Date.now() + 3600)
const id = "id";

const todo = new Todo(id, listName, description, start, end)

describe("[TodoDocument] Test Cases", () => {

	it("should create a document successfully", () => {
		const document = new TodoDocument("my list", "description", new Date().toISOString(), new Date().toISOString())
		expect(document).toBeDefined()
	})

	it("should create a document from todo successfully", () => {
		const document = TodoDocument.fromTodo(todo)
		expect(document.description).toEqual(description)
		expect(document.start).toEqual(todo.start.toISOString())
		expect(document.end).toEqual(todo.end.toISOString())
	})

	it("should convert a document to todo successfully", () => {
		const document = TodoDocument.fromTodo(todo)
		expect(document.toEntity(id)).toEqual(todo)
	})

	it("should throw en error because of an undefined Todo", () => {
		try {
			const _ = TodoDocument.fromTodo(notDefined)
		} catch (error) {
			expect(error.message).toEqual("ValidationError: No todo provided!")
		}
	})

})
