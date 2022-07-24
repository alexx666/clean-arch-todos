import { DeleteTodo, DeleteTodoRequest } from "@alexx666/todos";
import { Config } from "../../config";

import Request from "../../utils/request";

export class DeleteTodoImpl implements DeleteTodo {

	constructor(private readonly config: Config) { }

	public async execute(input: DeleteTodoRequest): Promise<void> {

		const request = new Request<void>({
			url: `${this.config.apiUrl}/lists/${input.listName}/todos/${input.id}`,
			method: "DELETE",
			headers: {
				'Content-Type': 'application/json',
			}
		})

		return request.send();
	}
}
