import { CreateTodo, CreateTodoRequest, UuidProvider } from "@alexx666/todos";
import { IncomingMessage, request } from "http";

export class CreateTodoImpl implements CreateTodo {

	constructor(private readonly config: { host: string, port: number }, private readonly uuidProvider: UuidProvider) { }

	async execute(input: CreateTodoRequest): Promise<void> {
		const options = {
			host: this.config.host,
			port: this.config.port,
			method: "POST",
			path: `/lists/${input.listName}/todos`,
			headers: {
				'Content-Type': 'application/json',
			}
		};

		const body = {
			id: input.id || this.uuidProvider.generate(),
			description: input.description,
			start: input.start,
			end: input.end,
		}

		return new Promise((resolve, reject) => {

			// TODO: handle errors based on status code
			const handler = (res: IncomingMessage) => {
				res.setEncoding('utf8');

				res.on("data", (data) => resolve(JSON.parse(data)));

				res.on("error", reject);
			}

			const req = request(options, handler);

			req.on("error", reject);

			req.write(JSON.stringify(body));

			req.end();
		});
	}
}
