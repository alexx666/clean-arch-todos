import { DynamoDB } from "aws-sdk";
import { EventRepository } from "../../../../ports";
import { Event } from "../../../../shared";

import { DynamoConfig } from "../../config";

export default class DynamoEventRepository implements EventRepository {

	private readonly ddb: DynamoDB.DocumentClient;

	constructor(private readonly config: DynamoConfig) {
		this.ddb = new DynamoDB.DocumentClient();
	}

	public async saveAll(events: Event[]): Promise<void> {

		const writeRequests = events.map(event => ({ PutRequest: { Item: event } }));

		await this.ddb.batchWrite({
			RequestItems: {
				[this.config.table]: writeRequests
			}
		}).promise();
	}

}
