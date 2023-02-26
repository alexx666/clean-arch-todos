import { CreateList, UuidGenerator } from "@todos/core";

import { Client } from "../infrastructure";

export class CreateListController {
	constructor(private client: Client, private uuids: UuidGenerator) { }

	public async handle({ listName, maxTodos, allowDuplicates, allowExpired }: any) {
		const request = new CreateList(this.uuids.generate(), {
			name: String(listName),
			maxTodos: Number(maxTodos ?? 10),
			allowDuplicates: Boolean(allowDuplicates ?? false),
			allowExpired: Boolean(allowExpired ?? true),
		});

		const result = await this.client.send(request);

		console.log("List Created!");
		console.table(result);
	}
}
