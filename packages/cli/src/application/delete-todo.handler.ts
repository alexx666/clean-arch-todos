import { DeleteTodo, IDeleteTodoHandler } from "@todos/core";

import { RequestBuilder } from "../ports";

export class DeleteTodoHandler implements IDeleteTodoHandler {

	constructor(private readonly builder: RequestBuilder) { }

	public execute(command: DeleteTodo): Promise<void> {
		const request = this.builder
			.setPath(`/lists/${command.params.listName}/todos/${command.params.id}`)
			.setMethod("DELETE")
			.setHeader("X-Request-Id", command.id)
			.build();

		return request.send();
	}
}
