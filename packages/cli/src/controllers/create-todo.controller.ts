
import { CreateTodo, UuidGenerator } from "@todos/core";

import { Client } from "../infrastructure";

export class CreateTodoController {
	constructor(private client: Client, private uuids: UuidGenerator) { }

	public async handle({ listName, description, start, end }: any) {

		const request = new CreateTodo(this.uuids.generate(), {
			listName: String(listName),
			description: String(description),
			start: String(start),
			end: String(end),
		});

		const result = await this.client.send(request);

		console.log("Todo Added!");
		console.table(result);
	}
}
