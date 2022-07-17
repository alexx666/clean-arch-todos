import { DeleteTodo, DeleteTodoRequest, DeleteTodoResponse } from "@alexx666/todos";
import { Config } from "../../config";

import Request from "../../utils/request";

export class DeleteTodoImpl implements DeleteTodo {

	constructor(private readonly config: Config) { }

	public async execute(input: DeleteTodoRequest): Promise<DeleteTodoResponse> {

		const request = new Request<DeleteTodoResponse>({
			url: `${this.config.apiUrl}/lists/${input.listName}/todos/${input.id}`,
			method: "DELETE",
			headers: {
				'Content-Type': 'application/json',
			}
		})

		return request.send();
	}
}
