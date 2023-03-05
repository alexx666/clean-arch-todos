import { IShowLists, ShowListResonse, UuidGenerator } from "@todos/core";
import { RequestClient } from "../ports";

export class ShowLists implements IShowLists {

	constructor(private readonly client: RequestClient, private readonly uuids: UuidGenerator) { }

	public async execute(): Promise<ShowListResonse> {
		const request = this.client.getBuilder()
			.setPath("/lists")
			.setMethod("GET")
			.setHeader("X-Request-Id", this.uuids.generate())
			.build();

		return request.send();
	}
}
