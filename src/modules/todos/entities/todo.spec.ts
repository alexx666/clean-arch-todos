import Todo from "./todo";

const notDefined: any = undefined;
const description = "description";
const listName = "my list";
const start = new Date()
const end = new Date(Date.now() + 3600)
const id = "id";

describe("[Todo] Test Cases", () => {

	it("should create a todo successfully", () => {
		const todo = new Todo(id, listName, description, start, end)
		expect(todo).toBeDefined()
	})

	it("should throw en error because of a missing ID", () => {
		try {
			const _ = new Todo(notDefined, listName, description, start, end)
		} catch (error) {
			expect(error.message).toEqual("ValidationError: Id not provided!")
		}
	})

	it("should throw en error because of a missing ListName", () => {
		try {
			const _ = new Todo(id, listName, notDefined, start, end)
		} catch (error) {
			expect(error.message).toEqual("ValidationError: Description not provided!")
		}
	})

	it("should throw en error because of a missing Description", () => {
		try {
			const _ = new Todo(id, notDefined, description, start, end)
		} catch (error) {
			expect(error.message).toEqual("ValidationError: List not provided!")
		}
	})

	it("should throw en error because of a missing Start date", () => {
		try {
			const _ = new Todo(id, listName, description, notDefined, end)
		} catch (error) {
			expect(error.message).toEqual("ValidationError: todo Timeline not defined!")
		}
	})

	it("should throw en error because of a missing End date", () => {
		try {
			const _ = new Todo(id, listName, description, start, notDefined)
		} catch (error) {
			expect(error.message).toEqual("ValidationError: todo Timeline not defined!")
		}
	})

})
