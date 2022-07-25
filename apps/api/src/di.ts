import { CryptoUuid, Events, InMemoryPublisher, InMemoryTodoRepository } from "@alexx666/todos";

export const eventStore: Events<any> = new Events();

export const providers = {
    repository: new InMemoryTodoRepository(eventStore),
    uuidProvider: new CryptoUuid(),
    publisher: new InMemoryPublisher(eventStore),
};
