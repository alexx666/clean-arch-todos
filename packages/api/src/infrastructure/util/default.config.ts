import { IdempotencyConfig } from "@todos/core";
import { APIGatewayIdentifier } from "./api-gw.identifier";

import { DynamoDBCache } from "./dynamodb.cache";

export const defaultIdempotencyConfig: IdempotencyConfig = {
	cache: new DynamoDBCache(String(process.env.IDEMPOTENCY_TABLE_NAME)),
	identifier: new APIGatewayIdentifier(String(process.env.REQUEST_ID_HEADER)),
};
