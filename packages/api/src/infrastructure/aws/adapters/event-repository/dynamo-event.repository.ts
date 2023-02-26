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

	public async saveAll(commands: Command[]): Promise<void> {
		const writeRequests = commands.map((command) => ({
			// FIXME: map command to dynamo item by setting stream
			PutRequest: { Item: command },
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
