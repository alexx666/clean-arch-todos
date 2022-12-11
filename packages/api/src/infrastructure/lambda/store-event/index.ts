import { DynamoEventRepository } from "@todos/core";

import { storeEvent } from "../../../controllers";
import { StoreEventHandler } from "../../../application";

const repository = new DynamoEventRepository({
	table: String(process.env.DYNAMO_TABLE_NAME),
});

const interactor = new StoreEventHandler(repository);

export const handler = storeEvent(interactor);
