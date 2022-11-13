import { Command } from "../shared";

export interface Mediator {
	send<Output>(command: Command): Promise<Output>;
}
