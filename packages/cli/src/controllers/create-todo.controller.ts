import { delay, inject, injectable } from "tsyringe";

import { CreateTodo, UuidGenerator, UUIDS } from "@todos/core";
import { Client } from "../infrastructure";

@injectable()
export class CreateTodoController {
	constructor(@inject(delay(() => Client)) private client: Client, @inject(UUIDS) private uuids: UuidGenerator) { }

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
