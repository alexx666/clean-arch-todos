import { IListTodos, ListTodosRequest, ListTodosResponse } from "@todos/core";

import { Config, Request } from "../infrastructure";

export class ListTodos implements IListTodos {

	constructor(private readonly config: Config) { }

	public async execute(input: ListTodosRequest): Promise<ListTodosResponse> {
		const request = new Request<ListTodosResponse>({
			url: `${this.config.apiUrl}/lists/${input.listName}/todos`,
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		return request.send();
	}

}
