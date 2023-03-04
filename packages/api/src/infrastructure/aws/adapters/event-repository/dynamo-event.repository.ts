import { Command, EventRepository } from "@todos/core";

import { DynamoDB } from "aws-sdk";

export class DynamoEventRepository implements EventRepository {

	constructor(private readonly tableName: string, private readonly ddb: DynamoDB.DocumentClient) { }

	public async saveAll(commands: Command[]): Promise<void> {
		const writeRequests = commands.map((command) => ({
			// FIXME: map command to dynamo item by setting stream
			PutRequest: { Item: command },
		}));

		await this.ddb
			.batchWrite({
				RequestItems: {
					[this.tableName]: writeRequests,
				},
			})
			.promise();
	}
}
