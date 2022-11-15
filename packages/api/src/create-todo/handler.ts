import { CreateTodoHandler, CREATE_TODO, CryptoUuid, Mediator, DynamoListRepository, SNSMediator } from "@alexx666/todos-core";

import createHandler from "./controller";

const cryptoUuid = new CryptoUuid();

const dynamoListRepo = new DynamoListRepository({
	table: String(process.env.DYNAMO_TABLE_NAME),
})

const snsMediator = new SNSMediator({
	topic: String(process.env.SNS_TOPIC_ARN)
})

const di = new Map();

const mediator = new Mediator(di);

di.set(CREATE_TODO, new CreateTodoHandler(dynamoListRepo, cryptoUuid, snsMediator));

export const handler = createHandler(mediator);
