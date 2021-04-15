import { Todo } from "../../modules/todos/entities/todo";

import TodoDocument from "./todo-document";

const notDefined: any = undefined;
const description = "description";
const todo = new Todo("id", "description", new Date())

describe("[TodoDocument] Test Cases", () => {

	it("should create a document successfully", () => {
		const document = new TodoDocument("description", new Date().toISOString())
		expect(document).toBeDefined()
	})

	it("should create a document from todo successfully", () => {
		const document = TodoDocument.fromTodo(todo)
		expect(document.description).toEqual(description)
		expect(document.due).toEqual(todo.due.toISOString())
	})

	it("should convert a document to todo successfully", () => {
		const document = TodoDocument.fromTodo(todo)
		expect(document.toEntity("id")).toEqual(todo)
	})

	it("should throw en error because of an undefined Todo", () => {
		try {
			const _ = TodoDocument.fromTodo(notDefined)
		} catch (error) {
			expect(error.message).toEqual("ValidationError: No todo provided!")
		}
	})

	it("should throw en error because of a missing Description", () => {
		try {
			const _ = new TodoDocument(notDefined, new Date().toISOString())
		} catch (error) {
			expect(error.message).toEqual("ValidationError: Description not provided!")
		}
	})

	it("should throw en error because of a missing Due date", () => {
		try {
			const _ = new TodoDocument("description", notDefined)
		} catch (error) {
			expect(error.message).toEqual("ValidationError: Due date not provided!")
		}
	})

})
