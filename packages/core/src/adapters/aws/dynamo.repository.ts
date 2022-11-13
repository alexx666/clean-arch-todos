import { DynamoDB } from "aws-sdk";

import { List } from "../../entities";
import { Event } from "../../shared";
import { ListRepository } from "../../ports";

export class DynamoListRepository implements ListRepository {
	constructor(
		private readonly ddb: DynamoDB.DocumentClient = new DynamoDB.DocumentClient()
	) { }

	public async findByName(id: string): Promise<List | undefined> {
		const { Items: events } = await this.ddb
			.query({
				TableName: String(process.env.DYNAMO_TABLE_NAME),
				KeyConditionExpression: "#stream = :stream",
				ExpressionAttributeValues: { ":stream": `List:${id}` },
				ExpressionAttributeNames: { "#stream": "stream" },
			})
			.promise();

		if (!events?.length) return;

		return List.buildFromStream(events as Event[]);
	}
}
