import { randomUUID } from "crypto";

import UuidGenerator from "../../ports/uuid";

export default class CryptoUuid implements UuidGenerator {
	public generate() {
		return randomUUID({ disableEntropyCache: true });
	}
}
