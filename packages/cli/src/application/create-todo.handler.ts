import { CreateTodo, ICreateTodoHandler } from "@todos/core";

import { RequestBuilder } from "../ports";

export class CreateTodoHandler implements ICreateTodoHandler {

	constructor(private readonly builder: RequestBuilder) { }

	public async execute(command: CreateTodo): Promise<void> {
		const request = this.builder
			.setPath(`/lists/${command.params.listName}/todos`)
			.setMethod("POST")
			.setHeader("X-Request-Id", command.id)
			.setBody(JSON.stringify(command.params))
			.build();

		return request.send();
	}
}
