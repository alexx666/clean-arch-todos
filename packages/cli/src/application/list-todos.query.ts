import { IListTodos, ListTodosRequest, ListTodosResponse } from "@todos/core";

import { RequestBuilder } from "../ports";

export class ListTodos implements IListTodos {

	constructor(private readonly builder: RequestBuilder) { }

	public async execute(input: ListTodosRequest): Promise<ListTodosResponse> {
		const request = this.builder
			.setPath(`/lists/${input.listName}/todos`)
			.setMethod("GET")
			.build();

		return request.send();
	}
}
