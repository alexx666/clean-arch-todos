import { Command } from "../kernel";

export interface EventRepository {
	saveAll(events: Command[]): Promise<void>;
}
