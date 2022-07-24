import { CryptoUuid, InMemoryPublisher, InMemoryTodoRepository } from "@alexx666/todos";

const eventStore: any[] = [];

export const providers = {
    repository: new InMemoryTodoRepository(eventStore),
    uuidProvider: new CryptoUuid(),
    publisher: new InMemoryPublisher(eventStore),
};