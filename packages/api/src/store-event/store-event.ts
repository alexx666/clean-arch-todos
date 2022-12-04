import { Event, EventRepository } from "@todos/core";

export class StoreEventHandler {

	constructor(private readonly events: EventRepository) { }

	public async execute(events: Event[]) {
		await this.events.saveAll(events);
	}
}
