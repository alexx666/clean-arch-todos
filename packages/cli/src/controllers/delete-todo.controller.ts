import { delay, inject, injectable } from "tsyringe";

import { DeleteTodo, DeleteTodoParameters, UuidGenerator, UUIDS } from "@todos/core";

import { Client } from "../infrastructure";

@injectable()
export class DeleteTodoController {
	constructor(@inject(delay(() => Client)) private client: Client, @inject(UUIDS) private uuids: UuidGenerator) { }

	public async handle({ listName, id }: any) {
		const request: DeleteTodoParameters = { listName: String(listName), id: String(id) };

		await this.client.send(new DeleteTodo(this.uuids.generate(), request));

		console.log("Todo Removed:", id);
	}
}
