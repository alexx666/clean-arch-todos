import { IListTodos, ListTodosRequest, ListTodosResponse } from "@todos/core";

import { ClientConfig } from "../config";
import { HTTPRequest } from "../http";

export class ListTodos implements IListTodos {
	constructor(private readonly config: ClientConfig) { }

	public async execute(input: ListTodosRequest): Promise<ListTodosResponse> {
		const request = new HTTPRequest<ListTodosResponse>({
			url: `${this.config.apiUrl}/lists/${input.listName}/todos`,
			method: "GET",
		});

		return request.send();
	}
}
