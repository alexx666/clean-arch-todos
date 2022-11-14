import { CreateTodo, CreateTodoResponse, ICreateTodoHandler } from "@alexx666/todos-core";

import { Config } from "../config";
import { Request } from "../request";

export class CreateTodoHandler implements ICreateTodoHandler {

	constructor(private readonly config: Config) { }

	public execute(command: CreateTodo): Promise<CreateTodoResponse> {
		const request = new Request<CreateTodoResponse>({
			url: `${this.config.apiUrl}/lists/${command.params.listName}/todos`,
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				id: command.params.id,
				description: command.params.description,
				start: command.params.start,
				end: command.params.end,
			}),
		})

		return request.send();
	}

}
