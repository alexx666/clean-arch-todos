import { IdempotencyConfig } from "@todos/core";

import { DynamoDBCache } from "./dynamodb.cache";

export const defaultIdempotencyConfig: IdempotencyConfig = {
	cache: new DynamoDBCache(String(process.env.IDEMPOTENCY_TABLE_NAME)),
};
