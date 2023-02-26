import { Command, EventRepository } from "@todos/core";

import { DynamoDB } from "aws-sdk";

import { DynamoConfig } from "../../config";

export class DynamoEventRepository implements EventRepository {
	private readonly ddb: DynamoDB.DocumentClient;

	constructor(private readonly config: DynamoConfig) {
		console.log({ config });

		this.ddb = new DynamoDB.DocumentClient({
			endpoint: config.endpoint,
			sslEnabled: config.sslEnabled,
		});
	}

	public async saveAll(events: Command[]): Promise<void> {
		const writeRequests = events.map((event) => ({
			PutRequest: { Item: event },
		}));

		await this.ddb
			.batchWrite({
				RequestItems: {
					[this.config.table]: writeRequests,
				},
			})
			.promise();
	}
}