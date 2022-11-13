import { Event, Command } from "../shared";

export interface Mediator {
	send<Output>(command: Command): Promise<Output>;
	notify(event: Event): Promise<void>;
}
