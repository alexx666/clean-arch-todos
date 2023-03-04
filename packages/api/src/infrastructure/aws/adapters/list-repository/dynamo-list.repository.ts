import { Command, List, ListProjectionMapper, ListRepository } from "@todos/core";

import { DynamoDB } from "aws-sdk";

export class DynamoListRepository implements ListRepository {

	constructor(private readonly tableName: string, private readonly ddb: DynamoDB.DocumentClient) { }

	public async findByName(id: string): Promise<List | undefined> {
		const { Items: events } = await this.ddb
			.query({
				TableName: this.tableName,
				KeyConditionExpression: "#stream = :stream",
				ExpressionAttributeValues: { ":stream": `List:${id}` },
				ExpressionAttributeNames: { "#stream": "stream" },
			})
			.promise();

		if (!events?.length) return;

		return ListProjectionMapper.buildFromStream(events as Command[]);
	}
}
