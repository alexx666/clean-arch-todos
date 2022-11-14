import { randomUUID } from "crypto";

import { UuidGenerator } from "../../../ports";

export class CryptoUuid implements UuidGenerator {
	public generate() {
		return randomUUID({ disableEntropyCache: true });
	}
}
