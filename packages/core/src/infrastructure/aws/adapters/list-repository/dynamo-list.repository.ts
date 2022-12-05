import { DynamoDB } from "aws-sdk";

import { List } from "../../../../domain";
import { Event } from "../../../../shared";
import { ListRepository } from "../../../../ports";
import { DynamoConfig } from "../../config";

export class DynamoListRepository implements ListRepository {
	private readonly ddb: DynamoDB.DocumentClient;

	constructor(private readonly config: DynamoConfig) {
		this.ddb = new DynamoDB.DocumentClient();
	}

	public async findByName(id: string): Promise<List | undefined> {
		const { Items: events } = await this.ddb
			.query({
				TableName: this.config.table,
				KeyConditionExpression: "#stream = :stream",
				ExpressionAttributeValues: { ":stream": `List:${id}` },
				ExpressionAttributeNames: { "#stream": "stream" },
			})
			.promise();

		if (!events?.length) return;

		return List.buildFromStream(events as Event[]);
	}
}
