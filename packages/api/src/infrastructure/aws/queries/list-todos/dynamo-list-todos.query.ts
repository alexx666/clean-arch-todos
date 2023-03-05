import { Command, Commands, IListTodos, ListTodosRequest, ListTodosResponse, TodoItem, TodoItemProjectionMapper } from "@todos/core";

import { DynamoDB } from "aws-sdk";

export class DynamoListTodos implements IListTodos {

	constructor(private readonly tableName: string, private readonly ddb: DynamoDB.DocumentClient) { }

	public async execute(input: ListTodosRequest): Promise<ListTodosResponse> {
		const listId = input.listId;

		const { Items: sortedTodoEvents } = await this.ddb
			.query({
				TableName: this.tableName,
				KeyConditionExpression: "#stream = :stream",
				FilterExpression: `begins_with(#name, :todo_events)`,
				ExpressionAttributeValues: {
					":stream": listId,
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
			listId,
		};
	}
}
