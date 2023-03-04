import { Command, Event, EventRepository } from "@todos/core";

export class StoreEventHandler {

	constructor(private readonly events: EventRepository) { }

	public async execute(events: (Command & Event)[]) {
		await this.events.saveAll(events);
	}
}
