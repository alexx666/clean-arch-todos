import {
	CreateTodo,
	CreateTodoRequest,
	CreateTodoResponse,
	UuidGenerator,
} from "@alexx666/todos";
import { Config } from "../../config";
import Request from "../../utils/request";

export class CreateTodoImpl implements CreateTodo {
	constructor(
		private readonly config: Config,
		private readonly uuidProvider: UuidGenerator
	) {}

	async execute(input: CreateTodoRequest): Promise<CreateTodoResponse> {
		const request = new Request<CreateTodoResponse>({
			url: `${this.config.apiUrl}/lists/${input.listName}/todos`,
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				id: input.id || this.uuidProvider.generate(),
				description: input.description,
				start: input.start,
				end: input.end,
			}),
		});

		return request.send();
	}
}
