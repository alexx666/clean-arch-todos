import { Command, Commands, IShowLists, ListItem, ListItemProjectionMapper, ShowListResonse } from "@todos/core";
import { DynamoDB } from "aws-sdk";

export class DynamoShowLists implements IShowLists {

	constructor(private readonly tableName: string, private readonly ddb: DynamoDB.DocumentClient) { }

	public async execute(): Promise<ShowListResonse> {
		const { Items: sortedListEvents } = await this.ddb.scan({
			TableName: this.tableName,
			FilterExpression: `begins_with(#name, :list_events)`,
			ExpressionAttributeValues: {
				":list_events": "List",
			},
			ExpressionAttributeNames: {
				"#name": "name",
			},
		}).promise()

		const groupedListEvents = new Commands(...(sortedListEvents as Command[])).groupById();

		const items = Object.keys(groupedListEvents).reduce((lists: ListItem[], id: string) => ([
			...lists,
			ListItemProjectionMapper.buildFromStream(groupedListEvents[id]),
		]), []);

		return {
			items,
			count: items.length,
		};
	}

}
