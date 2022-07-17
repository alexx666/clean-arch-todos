import { DeleteTodo, DeleteTodoRequest, DeleteTodoResponse } from "@alexx666/todos";

import { IncomingMessage, request } from "http";

export class DeleteTodoImpl implements DeleteTodo {

	constructor(private readonly config: { host: string, port: number }) { }

	public async execute(input: DeleteTodoRequest): Promise<DeleteTodoResponse> {
		const options = {
			host: this.config.host,
			port: this.config.port,
			method: "DELETE",
			path: `/lists/${input.listName}/todos/${input.id}`,
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
