import { DeleteTodo, IDeleteTodoHandler } from "@todos/core";

import { ClientConfig } from "../config";
import { HTTPRequest } from "../http";

export class DeleteTodoHandler implements IDeleteTodoHandler {
	constructor(private readonly config: ClientConfig) { }

	public execute(command: DeleteTodo): Promise<void> {
		const request = new HTTPRequest<void>({
			requestId: command.id,
			url: `${this.config.apiUrl}/lists/${command.params.listName}/todos/${command.params.id}`,
			method: "DELETE",
		});

		return request.send();
	}
}
