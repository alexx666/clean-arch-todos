
import { CreateTodo, ICreateTodoHandler, UuidGenerator } from "@todos/core";

export class CreateTodoController {
	constructor(private handler: ICreateTodoHandler, private uuids: UuidGenerator) { }

	public async handle({ listId, description, start, end }: any) {

		const request = new CreateTodo(this.uuids.generate(), {
			listId: String(listId),
			description: String(description),
			start: String(start),
			end: String(end),
		});

		const result = await this.handler.execute(request);

		console.log("Todo Added!");
		console.table(result);
	}
}
