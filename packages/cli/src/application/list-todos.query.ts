import { IListTodos, ListTodosRequest, ListTodosResponse, UuidGenerator } from "@todos/core";

import { RequestClient } from "../ports";

export class ListTodos implements IListTodos {

	constructor(private readonly client: RequestClient, private readonly uuids: UuidGenerator) { }

	public async execute(input: ListTodosRequest): Promise<ListTodosResponse> {
		const request = this.client.getBuilder()
			.setPath(`/lists/${input.listId}/todos`)
			.setMethod("GET")
			.setHeader("X-Request-Id", this.uuids.generate())
			.build();

		return request.send();
	}
}
