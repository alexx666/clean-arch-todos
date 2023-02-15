import { Event } from "../kernel";

export default interface EventRepository {
	saveAll(events: Event[]): Promise<void>;
}
