import { DynamoDB } from "aws-sdk";

import { Event, Events } from "../../../../shared";
import { IListTodos, ListTodosRequest, ListTodosResponse } from "../../../../application";
import { TodoItem } from "../../../../domain";
import { DynamoConfig } from "../../config";

export class DynamoListTodos implements IListTodos {
	private readonly ddb: DynamoDB.DocumentClient;

	constructor(private readonly config: DynamoConfig) {
		this.ddb = new DynamoDB.DocumentClient();
	}

	public async execute(input: ListTodosRequest): Promise<ListTodosResponse> {
		const listName = input.listName;

		const { Items: sortedTodoEvents } = await this.ddb
			.query({
				TableName: this.config.table,
				KeyConditionExpression: "#stream = :stream",
				FilterExpression: `begins_with(#type, :todo_events)`,
				ExpressionAttributeValues: {
					":stream": `List:${listName}`,
					":todo_events": "Todo",
				},
				ExpressionAttributeNames: {
					"#stream": "stream",
					"#type": "type",
				},
			})
			.promise();

		const groupedTodoEvents = new Events(
			...(sortedTodoEvents as Event[])
		).groupById();

		const items: TodoItem[] = Object.keys(groupedTodoEvents).reduce(
			(todos: TodoItem[], id: string) => [
				...todos,
				TodoItem.buildFromStream(groupedTodoEvents[id]),
			],
			[]
		);

		const active = items.filter((item) => !item.isDeleted);

		return {
			items,
			count: active.length,
			listName,
		};
	}
}
