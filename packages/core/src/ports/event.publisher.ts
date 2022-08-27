import { Event } from "../events";

/**
 * Class responsible for publishing domain events to an arbitrary message bus
 */
export default interface EventPublisher {
	/**
	 * Send a given event through the system
	 * @param event the {@link Event} to be published
	 */
	publish(event: Event): Promise<void>;
}
