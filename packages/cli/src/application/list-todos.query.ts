import { IListTodos, ListTodosRequest, ListTodosResponse } from "@todos/core";

import { RequestClient } from "../ports";

export class ListTodos implements IListTodos {

	constructor(private readonly client: RequestClient) { }

	public async execute(input: ListTodosRequest): Promise<ListTodosResponse> {
		const request = this.client.getBuilder()
			.setPath(`/lists/${input.listName}/todos`)
			.setMethod("GET")
			.build();

		return request.send();
	}
}
