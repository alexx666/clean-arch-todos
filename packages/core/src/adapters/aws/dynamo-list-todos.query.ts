import { DynamoDB } from "aws-sdk";
import { Event, Events } from "../../shared";

import { ListTodos, ListTodosRequest, ListTodosResponse } from "../../queries";
import { TodoItem } from "../../view-model";

export class DynamoListTodos implements ListTodos {
	constructor(
		private readonly ddb: DynamoDB.DocumentClient = new DynamoDB.DocumentClient()
	) { }

	public async execute(input: ListTodosRequest): Promise<ListTodosResponse> {
		const listName = input.listName;

		const { Items: sortedTodoEvents } = await this.ddb
			.query({
				TableName: String(process.env.DYNAMO_TABLE_NAME),
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
