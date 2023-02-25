import { DeleteTodo, IDeleteTodoHandler } from "@todos/core";

import { Config, Request } from "../infrastructure";

export class DeleteTodoHandler implements IDeleteTodoHandler {
	constructor(private readonly config: Config) { }

	public execute(command: DeleteTodo): Promise<void> {
		const request = new Request<void>({
			requestId: command.params.id,
			url: `${this.config.apiUrl}/lists/${command.params.listName}/todos/${command.params.id}`,
			method: "DELETE",
		});

		return request.send();
	}
}
