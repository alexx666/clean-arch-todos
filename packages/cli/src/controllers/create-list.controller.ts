import { delay, inject, injectable } from "tsyringe";

import { CreateList, UuidGenerator, UUIDS } from "@todos/core";

import { Client } from "../infrastructure";

@injectable()
export class CreateListController {
	constructor(@inject(delay(() => Client)) private client: Client, @inject(UUIDS) private uuids: UuidGenerator) { }

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
