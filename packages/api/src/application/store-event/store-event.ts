import { Command, EventRepository } from "@todos/core";

export class StoreEventHandler {

	constructor(private readonly events: EventRepository) { }

	public async execute(events: Command[]) {
		await this.events.saveAll(events);
	}
}
