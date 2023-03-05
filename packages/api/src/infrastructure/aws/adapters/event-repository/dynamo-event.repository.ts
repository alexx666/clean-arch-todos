import { Command, Event, EventRepository } from "@todos/core";

import { DynamoDB } from "aws-sdk";

export class DynamoEventRepository implements EventRepository {

	constructor(private readonly tableName: string, private readonly ddb: DynamoDB.DocumentClient) { }

	public async saveAll(commands: (Command & Event)[]): Promise<void> {

		console.debug("Saving events:", commands);

		const writeRequests = commands.map((command) => ({
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
