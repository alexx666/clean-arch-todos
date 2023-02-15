import { IdempotencyCache } from "./idempotency-cache";

export interface IdempotencyConfig {
	cache: IdempotencyCache;
}
