import { DeleteTodoHandler, DELETE_TODO, Mediator, DynamoListRepository, SNSMediator } from "@alexx666/todos-core";

import createHandler from "./controller";

const dynamoListRepo = new DynamoListRepository({
	table: String(process.env.DYNAMO_TABLE_NAME),
})

const snsMediator = new SNSMediator({
	topic: String(process.env.SNS_TOPIC_ARN)
})

const di = new Map();

const mediator = new Mediator(di);

di.set(DELETE_TODO, new DeleteTodoHandler(snsMediator, dynamoListRepo));

export const handler = createHandler(mediator);
