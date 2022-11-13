import { CreateList } from "@alexx666/todos-core";

import { Config } from "../../config";
import Request from "../../utils/request";

export class CreateListImpl {
	constructor(private readonly config: Config) { }

	public execute(input: CreateList): Promise<void> {
		const request = new Request<void>({
			url: `${this.config.apiUrl}/lists`,
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name: input.params.listName }),
		});

		return request.send();
	}
}
