import Event from "../events/event";

export interface Subscriber<T> {
    handle(event: Event<T>): Promise<void>;
}