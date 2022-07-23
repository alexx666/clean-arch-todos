import Event from "../events/event";

export default interface EventPublisher {
    publish<T>(event: Event<T>): Promise<void>;
}