import { CreateList, ICreateListHandler } from "@todos/core";

import { Config, Request } from "../infrastructure";

export class CreateListHandler implements ICreateListHandler {
	constructor(private readonly config: Config) {}

	public execute(command: CreateList): Promise<void> {
		const request = new Request<void>({
			url: `${this.config.apiUrl}/lists`,
			method: "POST",
			body: JSON.stringify(command.params),
		});

		return request.send();
	}
}
