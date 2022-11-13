import { DynamoDB } from "aws-sdk";

import { Command, Event } from "../../shared";
import { Mediator } from "../../ports";

export default class DynamoEventPublisher implements Mediator {
	constructor(
		private readonly ddb: DynamoDB.DocumentClient = new DynamoDB.DocumentClient()
	) { }

	public send<Output>(_: Command): Promise<Output> {
		throw new Error("Not implemented yet!");
	}

	// TODO: infrastructure error handling
	public async notify(event: Event) {
		await this.ddb
			.put({
				TableName: String(process.env.DYNAMO_TABLE_NAME),
				Item: event,
			})
			.promise();
	}
}
