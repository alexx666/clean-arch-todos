import { CryptoUuid, InMemoryEventStore, InMemoryPublisher, InMemoryTodoGateway, ListCreatedHandler, LIST_CREATED, TodoCreatedHandler, TodoDeletedHandler, TODO_CREATED, TODO_DELETED } from "@alexx666/todos";

const eventStore = new InMemoryEventStore();

eventStore.subscribe(LIST_CREATED, new ListCreatedHandler());
eventStore.subscribe(TODO_CREATED, new TodoCreatedHandler());
eventStore.subscribe(TODO_DELETED, new TodoDeletedHandler());

export const eventPublisher = new InMemoryPublisher(eventStore);
export const todoGateway = new InMemoryTodoGateway();
export const uuidProvider = new CryptoUuid();

export const providers = {
    repository: todoGateway,
    uuidProvider,
    publisher: eventPublisher,
};
