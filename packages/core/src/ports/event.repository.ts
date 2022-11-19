import { Event } from "../shared";

export default interface EventRepository {
	saveAll(events: Event[]): Promise<void>;
}
