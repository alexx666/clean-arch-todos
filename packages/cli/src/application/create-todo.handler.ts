import { CreateTodo, CreateTodoResponse, ICreateTodoHandler } from "@todos/core";

import { Config, Request } from "../infrastructure";

export class CreateTodoHandler implements ICreateTodoHandler {

	constructor(private readonly config: Config) { }

	public execute(command: CreateTodo): Promise<CreateTodoResponse> {
		const request = new Request<CreateTodoResponse>({
			url: `${this.config.apiUrl}/lists/${command.params.listName}/todos`,
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(command.params),
		})

		return request.send();
	}

}
