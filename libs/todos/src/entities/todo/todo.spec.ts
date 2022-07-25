import Todo from "./todo";

const listName = "my list";
const notDefined: any = undefined;
const description = "description";
const start = new Date()
const end = new Date(Date.now() + 3600)
const id = "id";

describe("[Todo] Test Cases", () => {

	it("should create a todo successfully", () => {
		const todo = new Todo({ id, description, startDate: start, endDate: end, listName })
		expect(todo).toBeDefined()
	})

	it("should throw en error because of a missing Description", () => {
		try {
			const _ = new Todo({ id, description: notDefined, startDate: start, endDate: end, listName })
		} catch (error) {
			expect((error as Error).message).toEqual("ValidationError: Description not provided!")
		}
	})

	it("should throw en error because of a missing Start date", () => {
		try {
			const _ = new Todo({ id, description, startDate: notDefined, endDate: end, listName })
		} catch (error) {
			expect((error as Error).message).toEqual("ValidationError: todo Timeline not defined!")
		}
	})

	it("should throw en error because of a missing End date", () => {
		try {
			const _ = new Todo({ id, description, startDate: start, endDate: notDefined, listName })
		} catch (error) {
			expect((error as Error).message).toEqual("ValidationError: todo Timeline not defined!")
		}
	})

})
