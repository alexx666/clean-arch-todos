import { Command, Event } from "../../shared";
import { Mediator } from "../../ports";

export default class InMemoryPublisher implements Mediator {
	constructor(private readonly events: any[] = []) { }

	public send<Output>(_: Command): Promise<Output> {
		throw new Error("Not implemented yet!");
	}

	public notify(event: Event) {
		this.events.push(event);
		return Promise.resolve();
	}
}
