import { randomUUID } from "crypto";

import UuidProvider from "../../ports/uuid";

export default class CryptoUuid implements UuidProvider {
    public generate() {
        return randomUUID({ disableEntropyCache: true });
    }
}