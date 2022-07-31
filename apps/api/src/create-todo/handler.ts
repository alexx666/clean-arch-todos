import { CreateTodoImpl, CryptoUuid, DynamoEventPublisher, DynamoListRepository } from "@alexx666/todos";

import createHandler from "./controller";

const providers = {
    repository: new DynamoListRepository(),
    uuidProvider: new CryptoUuid(),
    publisher: new DynamoEventPublisher(),
};

const useCase = new CreateTodoImpl(providers);

export const handler = createHandler(useCase)