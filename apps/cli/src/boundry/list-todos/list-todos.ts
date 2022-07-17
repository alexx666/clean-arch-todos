import { ListTodos, ListTodosRequest, ListTodosResponse } from "@alexx666/todos";
import { IncomingMessage, request } from "http";

export class ListTodosImpl implements ListTodos {

	constructor(private readonly config: { host: string, port: number }) { }

	public async execute(input: ListTodosRequest): Promise<ListTodosResponse> {
		const options = {
			host: this.config.host,
			port: this.config.port,
			method: "GET",
			path: `/lists/${input.listName}/todos`,
			headers: {
				'Content-Type': 'application/json',
			}
		};

		return new Promise((resolve, reject) => {

			// TODO: handle errors based on status code
			const handler = (res: IncomingMessage) => {
				res.setEncoding('utf8');

				res.on("data", (data) => resolve(JSON.parse(data)));

				res.on("error", reject);
			}

			const req = request(options, handler);

			req.on("error", reject);
			req.end();
		});
	}
}
