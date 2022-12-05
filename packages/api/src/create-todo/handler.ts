import { CreateTodoHandler, CREATE_TODO, Mediator, DynamoListRepository, SNSMediator } from "@todos/core";

import { CryptoUuid } from "../crypro-uuid";

import createHandler from "./controller";

const cryptoUuid = new CryptoUuid();

const dynamoListRepo = new DynamoListRepository({
	table: String(process.env.DYNAMO_TABLE_NAME),
})

const snsMediator = new SNSMediator({
	topic: String(process.env.SNS_TOPIC_ARN)
})

const mediator = new Mediator()
	.register(CREATE_TODO, new CreateTodoHandler(dynamoListRepo, cryptoUuid, snsMediator));

export const handler = createHandler(mediator);
