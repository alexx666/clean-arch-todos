import { CreateList, CreateListRequest } from "@alexx666/todos";
import { IncomingMessage, request } from "http";

export class CreateListImpl implements CreateList {

	constructor(private readonly config: { host: string, port: number }) { }

	public async execute(input: CreateListRequest): Promise<void> {
		const options = {
			host: this.config.host,
			port: this.config.port,
			method: "POST",
			path: `/lists`,
			headers: {
				'Content-Type': 'application/json',
			}
		};

		const body = {
			name: input.listName
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
