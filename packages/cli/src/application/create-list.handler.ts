import { CreateList, ICreateListHandler } from "@todos/core";

import { RequestClient } from "../ports";

export class CreateListHandler implements ICreateListHandler {

	constructor(private readonly client: RequestClient) { }

	public execute(command: CreateList): Promise<void> {
		const request = this.client.getBuilder()
			.setPath(`/lists`)
			.setMethod("POST")
			.setHeader("X-Request-Id", command.id)
			.setBody(JSON.stringify(command.params))
			.build();

		return request.send();
	}
}
