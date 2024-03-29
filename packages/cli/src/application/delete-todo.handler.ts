import { DeleteTodo, IDeleteTodoHandler } from "@todos/core";

import { RequestClient } from "../ports";

export class DeleteTodoHandler implements IDeleteTodoHandler {

	constructor(private readonly client: RequestClient) { }

	public execute(command: DeleteTodo) {
		const request = this.client.getBuilder()
			.setPath(`/lists/${command.params.listId}/todos/${command.params.id}`)
			.setMethod("DELETE")
			.setHeader("X-Request-Id", command.id)
			.build();

		return request.send<void>();
	}
}
