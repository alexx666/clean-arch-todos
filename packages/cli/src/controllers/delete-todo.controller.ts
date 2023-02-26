import { DeleteTodo, DeleteTodoParameters, UuidGenerator } from "@todos/core";

import { Client } from "../infrastructure";

export class DeleteTodoController {
	constructor(private client: Client, private uuids: UuidGenerator) { }

	public async handle({ listName, id }: any) {
		const request: DeleteTodoParameters = { listName: String(listName), id: String(id) };

		await this.client.send(new DeleteTodo(this.uuids.generate(), request));

		console.log("Todo Removed:", id);
	}
}
