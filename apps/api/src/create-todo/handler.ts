import { CreateTodoImpl, CryptoUuid, Events, InMemoryPublisher, InMemoryTodoRepository } from "@alexx666/todos";

import createHandler from "./controller";

// TODO: provide AWS implementation
const eventStore: Events<any> = new Events();

// TODO: provide AWS implementation
const providers = {
    repository: new InMemoryTodoRepository(eventStore),
    uuidProvider: new CryptoUuid(),
    publisher: new InMemoryPublisher(eventStore),
};

const useCase = new CreateTodoImpl(providers);

export const handler = createHandler(useCase)