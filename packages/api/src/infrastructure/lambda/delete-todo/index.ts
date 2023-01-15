import { DeleteTodoHandler, DynamoListRepository, SNSMediator } from "@todos/core";

import { deleteTodo } from "../../../controllers";

const dynamoListRepo = new DynamoListRepository({
	table: String(process.env.DYNAMO_TABLE_NAME),
	endpoint: process.env.AWS_ENDPOINT_URL,
	sslEnabled: process.env.AWS_ENDPOINT_URL === undefined,
})

const snsMediator = new SNSMediator({
	topic: String(process.env.SNS_TOPIC_ARN),
	endpoint: process.env.AWS_ENDPOINT_URL,
	sslEnabled: process.env.AWS_ENDPOINT_URL === undefined,
})

const deleteTodoInterator = new DeleteTodoHandler(snsMediator, dynamoListRepo);

export const handler = deleteTodo(deleteTodoInterator);
