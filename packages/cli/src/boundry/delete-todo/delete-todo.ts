import { DeleteTodo } from "@alexx666/todos-core";

import { Config } from "../../config";

import Request from "../../utils/request";

export class DeleteTodoImpl {
	constructor(private readonly config: Config) { }

	public async execute(input: DeleteTodo): Promise<void> {
		const request = new Request<void>({
			url: `${this.config.apiUrl}/lists/${input.params.listName}/todos/${input.params.id}`,
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		});

		return request.send();
	}
}
