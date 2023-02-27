import { CreateTodo, CreateTodoResponse, ICreateTodoHandler } from "@todos/core";

import { ClientConfig } from "../config";
import { HTTPRequest } from "../http";

export class CreateTodoHandler implements ICreateTodoHandler {
	constructor(private readonly config: ClientConfig) { }

	public async execute(command: CreateTodo): Promise<void> {
		const request = new HTTPRequest<CreateTodoResponse>({
			requestId: command.id,
			url: `${this.config.apiUrl}/lists/${command.params.listName}/todos`,
			method: "POST",
			body: JSON.stringify(command.params),
		});

		await request.send();
	}
}
