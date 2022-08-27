import EventPublisher from "./event.publisher";
import ListRepository from "./list.repository";
import UuidGenerator from "./uuid";

/**
 * A mapping of provider instances needed to initialize a command implementation.
 */
export default interface Providers {
	/**
	 * {@link ListRepository} instance for aggragating {@link List} data
	 */
	repository: ListRepository;
	/**
	 * {@link EventPublisher} instance for sending messages
	 */
	publisher: EventPublisher;
	/**
	 * {@link UuidGenerator} instance which implements the UUID algorithm
	 */
	uuid: UuidGenerator;
}
