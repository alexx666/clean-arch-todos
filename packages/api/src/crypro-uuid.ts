import { randomUUID } from "crypto";

import { UuidGenerator } from "@todos/core";

export class CryptoUuid implements UuidGenerator {
	public generate() {
		return randomUUID({ disableEntropyCache: true });
	}
}
