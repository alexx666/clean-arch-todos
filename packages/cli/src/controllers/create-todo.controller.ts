
import { CreateTodo, ICreateTodoHandler, UuidGenerator } from "@todos/core";

export class CreateTodoController {
	constructor(private handler: ICreateTodoHandler, private uuids: UuidGenerator) { }

	public async handle({ listName, description, start, end }: any) {

		const request = new CreateTodo(this.uuids.generate(), {
			listName: String(listName),
			description: String(description),
			start: String(start),
			end: String(end),
		});

		const result = await this.handler.execute(request);

		console.log("Todo Added!");
		console.table(result);
	}
}
