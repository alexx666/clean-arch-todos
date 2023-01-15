import { CreateTodoHandler, DynamoListRepository, SNSMediator } from "@todos/core";

import { CryptoUuid } from "../../util";

import { createTodo } from "../../../controllers";

const cryptoUuid = new CryptoUuid();

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

const createTodoInteractor = new CreateTodoHandler(dynamoListRepo, cryptoUuid, snsMediator);

export const handler = createTodo(createTodoInteractor);
