import { CreateTodo, CreateTodoResponse, ICreateTodoHandler } from "@todos/core";

import { RequestClient } from "../ports";

export class CreateTodoHandler implements ICreateTodoHandler {

	constructor(private readonly client: RequestClient) { }

	public async execute(command: CreateTodo): Promise<CreateTodoResponse> {
		const request = this.client.getBuilder()
			.setPath(`/lists/${command.params.listName}/todos`)
			.setMethod("POST")
			.setHeader("X-Request-Id", command.id)
			.setBody(JSON.stringify(command.params))
			.build();

		return request.send();
	}
}
