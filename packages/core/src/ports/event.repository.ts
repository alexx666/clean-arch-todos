import { Command, Event } from "../application";

export interface EventRepository {
	saveAll(events: (Command & Event)[]): Promise<void>;
}
