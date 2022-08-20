import { Event } from "../../events";
import { EventPublisher } from "../../ports";

export default class InMemoryPublisher implements EventPublisher {
	constructor(private readonly events: Event[] = []) { }

	public publish(event: Event): Promise<void> {
		this.events.push(event);
		return Promise.resolve();
	}
}
