import { CreateListHandler, DynamoListRepository, SNSMediator } from "@todos/core";

import { createList } from "../../../controllers";

const dynamoListRepo = new DynamoListRepository({
	table: String(process.env.DYNAMO_TABLE_NAME),
	endpoint: process.env.DYNAMODB_ENDPOINT,
	sslEnabled: process.env.DYNAMODB_ENDPOINT === undefined,
})

const snsMediator = new SNSMediator({
	topic: String(process.env.SNS_TOPIC_ARN)
})

const createListInteractor = new CreateListHandler(snsMediator, dynamoListRepo)

export const handler = createList(createListInteractor);
