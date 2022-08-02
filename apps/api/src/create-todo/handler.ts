import { CreateTodoImpl, CryptoUuid, DynamoEventPublisher, DynamoListRepository, Providers } from "@alexx666/todos";

import createHandler from "./controller";

const providers: Providers = {
    repository: new DynamoListRepository(),
    uuid: new CryptoUuid(),
    publisher: new DynamoEventPublisher(),
};

const useCase = new CreateTodoImpl(providers);

export const handler = createHandler(useCase)