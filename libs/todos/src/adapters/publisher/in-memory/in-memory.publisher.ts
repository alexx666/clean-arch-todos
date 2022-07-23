import Event from "../../../events/event";
import EventPublisher from "../../../ports/event.publisher";
import InMemoryEventStore from "./in-memory.store";

export default class InMemoryPublisher implements EventPublisher {

    constructor(private eventStore: InMemoryEventStore = new InMemoryEventStore()) { }

    async publish<T>(event: Event<T>): Promise<void> {
        await this.eventStore.notify(event);
    }
}