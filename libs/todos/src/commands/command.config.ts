import EventPublisher from "../ports/event.publisher";
import ListRepository from "../ports/list.repository";
import UuidProvider from "../ports/uuid";

export default interface CommandConfig {
    repository: ListRepository;
    publisher: EventPublisher;
    uuidProvider: UuidProvider;
}