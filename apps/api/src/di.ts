import { CryptoUuid, InMemoryPublisher, InMemoryTodoDao, InMemoryTodoRepository } from "@alexx666/todos";

const eventStore: any[] = [];

export const todoDao = new InMemoryTodoDao(eventStore);

export const providers = {
    repository: new InMemoryTodoRepository(eventStore),
    uuidProvider: new CryptoUuid(),
    publisher: new InMemoryPublisher(eventStore),
};
