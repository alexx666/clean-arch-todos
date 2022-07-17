import { randomUUID } from "crypto";

import UuidProvider from "./uuid";

export default class UuidV4 implements UuidProvider {
    public generate() {
        return randomUUID({ disableEntropyCache: true });
    }
}