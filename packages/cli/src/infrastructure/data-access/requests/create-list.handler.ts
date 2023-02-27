import { CreateList, ICreateListHandler } from "@todos/core";

import { ClientConfig } from "../config";
import { HTTPRequest } from "../http";

export class CreateListHandler implements ICreateListHandler {

	constructor(private readonly config: ClientConfig) { }

	public execute(command: CreateList): Promise<void> {
		const request = new HTTPRequest<void>({
			requestId: command.id,
			url: `${this.config.apiUrl}/lists`,
			method: "POST",
			body: JSON.stringify(command.params),
		});

		return request.send();
	}
}
