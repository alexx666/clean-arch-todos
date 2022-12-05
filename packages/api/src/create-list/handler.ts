import { CreateListHandler, CREATE_LIST, Mediator, DynamoListRepository, SNSMediator } from "@todos/core";

import createHandler from "./controller";

const dynamoListRepo = new DynamoListRepository({
	table: String(process.env.DYNAMO_TABLE_NAME),
})

const snsMediator = new SNSMediator({
	topic: String(process.env.SNS_TOPIC_ARN)
})

const mediator = new Mediator()
	.register(CREATE_LIST, new CreateListHandler(snsMediator, dynamoListRepo));

export const handler = createHandler(mediator);
