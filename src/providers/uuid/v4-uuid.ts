import UUDIGenerator from "../../modules/shared/uuid-generator";

import { v4 } from "uuid";

export default class V4UuidGenerator implements UUDIGenerator {
    public generate(): string {
        return v4()
    }
}
