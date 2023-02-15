import { DynamoDBCache } from "./dynamodb.cache";
import { IdempotencyConfig } from "./idempotency.config";

export const defaultIdempotencyConfig: IdempotencyConfig = {
	cache: new DynamoDBCache(String(process.env.IDEMPOTENCY_TABLE_NAME))
}
