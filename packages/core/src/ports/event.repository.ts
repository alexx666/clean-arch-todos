import { Command } from "../application";

export interface EventRepository {
	saveAll(events: Command[]): Promise<void>;
}
