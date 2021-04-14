import { Todo } from "./todo";

const notDefined: any = undefined;

describe("[Todo] Test Cases", () => {

	it("should create a todo successfully", () => {
		const todo = new Todo("id", "description", new Date())
		expect(todo).toBeDefined()
	})

	it("should throw en error because of a missing ID", () => {
		try {
			const _ = new Todo(notDefined, "description", new Date())
		} catch (error) {
			expect(error.message).toEqual("ValidationError: Id not provided!")
		}
	})

	it("should throw en error because of a missing ID", () => {
		try {
			const _ = new Todo("id", notDefined, new Date())
		} catch (error) {
			expect(error.message).toEqual("ValidationError: Description not provided!")
		}
	})

	it("should throw en error because of a missing Due date", () => {
		try {
			const _ = new Todo("id", "description", notDefined)
		} catch (error) {
			expect(error.message).toEqual("ValidationError: Due date not provided!")
		}
	})

})
