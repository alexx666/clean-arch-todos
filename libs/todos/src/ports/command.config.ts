import EventPublisher from "./event.publisher";
import ListRepository from "./list.repository";
import UuidProvider from "./uuid";

export default interface CommandConfig {
    repository: ListRepository;
    publisher: EventPublisher;
    uuidProvider: UuidProvider;
}