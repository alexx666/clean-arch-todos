import {
	CreateTodo,
	CreateTodoResponse,
	ICreateTodoHandler,
} from "@todos/core";

import { Config, Request } from "../infrastructure";

export class CreateTodoHandler implements ICreateTodoHandler {
	constructor(private readonly config: Config) { }

	public async execute(command: CreateTodo): Promise<void> {
		const request = new Request<CreateTodoResponse>({
			requestId: command.id,
			url: `${this.config.apiUrl}/lists/${command.params.listName}/todos`,
			method: "POST",
			body: JSON.stringify(command.params),
		});

		await request.send();
	}
}
