import {
	CreateTodo,
	CreateTodoResponse,
	UuidGenerator,
} from "@alexx666/todos-core";
import { Config } from "../../config";
import Request from "../../utils/request";

export class CreateTodoImpl {
	constructor(
		private readonly config: Config,
		private readonly uuidProvider: UuidGenerator
	) { }

	async execute(input: CreateTodo): Promise<CreateTodoResponse> {
		const request = new Request<CreateTodoResponse>({
			url: `${this.config.apiUrl}/lists/${input.params.listName}/todos`,
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				id: input.params.id || this.uuidProvider.generate(),
				description: input.params.description,
				start: input.params.start,
				end: input.params.end,
			}),
		});

		return request.send();
	}
}
