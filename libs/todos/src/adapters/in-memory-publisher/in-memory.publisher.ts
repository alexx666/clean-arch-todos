import { Event } from "../../events";
import { EventPublisher } from "../../ports";

export default class InMemoryPublisher implements EventPublisher {

    constructor(private readonly events: Event<any>[] = []) { }

    async publish<T>(event: Event<T>): Promise<void> {
        this.events.push(event);
    }
}