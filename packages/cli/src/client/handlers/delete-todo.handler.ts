import { DeleteTodo, IDeleteTodoHandler } from "@alexx666/todos-core";

import { Config } from "../config";
import { Request } from "../request";

export class DeleteTodoHandler implements IDeleteTodoHandler {

	constructor(private readonly config: Config) { }

	public execute(command: DeleteTodo): Promise<void> {

		const request = new Request<void>({
			url: `${this.config.apiUrl}/lists/${command.params.listName}/todos/${command.params.id}`,
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		})

		return request.send();
	}

}
