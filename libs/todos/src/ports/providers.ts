import EventPublisher from "./event.publisher";
import ListRepository from "./list.repository";
import UuidGenerator from "./uuid";

export default interface Providers {
    repository: ListRepository;
    publisher: EventPublisher;
    uuid: UuidGenerator;
}