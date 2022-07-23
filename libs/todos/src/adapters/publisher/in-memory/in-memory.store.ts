import Event from "../../../events/event";
import { Subscriber } from "../../../ports/event.subscriber";

export default class InMemoryEventStore {

    constructor(private readonly subscribers = new Map<string, Subscriber<any>[]>()) { }

    public subscribe<T>(type: string, subscriber: Subscriber<T>) {
        const subscribers = this.subscribers.get(type) || [];

        subscribers.push(subscriber);

        this.subscribers.set(type, subscribers);
    }

    public notify<T>(event: Event<T>) {
        const subscribers = this.subscribers.get(event.type) || [];

        for (const subscriber of subscribers) {
            subscriber.handle(event);
        }
    }
}