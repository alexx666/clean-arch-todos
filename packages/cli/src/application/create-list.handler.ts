import { CreateList, ICreateListHandler } from "@todos/core";

import { RequestBuilder } from "../ports";

export class CreateListHandler implements ICreateListHandler {

	constructor(private readonly builder: RequestBuilder) { }

	public execute(command: CreateList): Promise<void> {
		const request = this.builder
			.setPath(`/lists`)
			.setMethod("POST")
			.setHeader("X-Request-Id", command.id)
			.setBody(JSON.stringify(command.params))
			.build();

		return request.send();
	}
}
