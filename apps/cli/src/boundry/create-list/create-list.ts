import { CreateList, CreateListRequest, CreateListResponse } from "@alexx666/todos";

import { Config } from "../../config";
import Request from "../../utils/request";

export class CreateListImpl implements CreateList {

	constructor(private readonly config: Config) { }

	public execute(input: CreateListRequest): Promise<CreateListResponse> {
		const request = new Request<CreateListResponse>({
			url: `${this.config.apiUrl}/lists`,
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ name: input.listName })
		})

		return request.send()
	}
}
