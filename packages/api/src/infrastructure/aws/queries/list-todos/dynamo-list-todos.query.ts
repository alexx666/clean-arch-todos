import { Command, Commands, IListTodos, ListTodosRequest, ListTodosResponse, TodoItem, TodoItemProjectionMapper } from "@todos/core";

import { DynamoDB } from "aws-sdk";

import { DynamoConfig } from "../../config";

export class DynamoListTodos implements IListTodos {
	private readonly ddb: DynamoDB.DocumentClient;

	constructor(private readonly config: DynamoConfig) {
		this.ddb = new DynamoDB.DocumentClient({
			endpoint: config.endpoint,
			sslEnabled: config.sslEnabled,
		});
	}

	public async execute(input: ListTodosRequest): Promise<ListTodosResponse> {
		const listName = input.listName;

		const { Items: sortedTodoEvents } = await this.ddb
			.query({
				TableName: this.config.table,
				KeyConditionExpression: "#stream = :stream",
				FilterExpression: `begins_with(#name, :todo_events)`,
				ExpressionAttributeValues: {
					":stream": `List:${listName}`,
					":todo_events": "Todo",
				},
				ExpressionAttributeNames: {
					"#stream": "stream",
					"#name": "name",
				},
			})
			.promise();

		const groupedTodoEvents = new Commands(
			...(sortedTodoEvents as Command[])
		).groupById();

		const items: TodoItem[] = Object.keys(groupedTodoEvents).reduce(
			(todos: TodoItem[], id: string) => [
				...todos,
				TodoItemProjectionMapper.buildFromStream(groupedTodoEvents[id]),
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
