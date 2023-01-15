import { DynamoEventRepository } from "@todos/core";

import { storeEvent } from "../../../controllers";
import { StoreEventHandler } from "../../../application";

const repository = new DynamoEventRepository({
	table: String(process.env.DYNAMO_TABLE_NAME),
	endpoint: process.env.AWS_ENDPOINT_URL,
	sslEnabled: process.env.AWS_ENDPOINT_URL === undefined,
});

const interactor = new StoreEventHandler(repository);

export const handler = storeEvent(interactor);
