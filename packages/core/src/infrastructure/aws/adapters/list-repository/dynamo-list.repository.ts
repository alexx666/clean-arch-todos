import { DynamoDB } from "aws-sdk";

import { List } from "../../../../domain";
import { Command } from "../../../../kernel";
import { ListRepository, ListProjectionMapper } from "../../../../ports";
import { DynamoConfig } from "../../config";

export class DynamoListRepository implements ListRepository {
	private readonly ddb: DynamoDB.DocumentClient;

	constructor(private readonly config: DynamoConfig) {
		console.log({ config });

		this.ddb = new DynamoDB.DocumentClient({
			endpoint: config.endpoint,
			sslEnabled: config.sslEnabled,
		});
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

		return ListProjectionMapper.buildFromStream(events as Command[]);
	}
}
