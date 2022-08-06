import {
	ListTodos,
	ListTodosRequest,
	ListTodosResponse,
} from "@alexx666/todos";
import { Config } from "../../config";
import Request from "../../utils/request";

export class ListTodosImpl implements ListTodos {
	constructor(private readonly config: Config) {}

	public async execute(input: ListTodosRequest): Promise<ListTodosResponse> {
		const request = new Request<ListTodosResponse>({
			url: `${this.config.apiUrl}/lists/${input.listName}/todos`,
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		return request.send();
	}
}
