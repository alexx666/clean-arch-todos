import { DynamoEventRepository } from "@todos/core";

import createHandler from "./controller";
import { StoreEventHandler } from "./store-event";

const repository = new DynamoEventRepository({
	table: String(process.env.DYNAMO_TABLE_NAME),
});

const storeEventHandler = new StoreEventHandler(repository);

export const handler = createHandler(storeEventHandler);
