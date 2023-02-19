import { IdempotencyCache } from "./idempotency.cache";
import { IdentityProvider } from "./identity.provider";

export interface IdempotencyConfig {
	cache: IdempotencyCache;
	identifier: IdentityProvider;
}
