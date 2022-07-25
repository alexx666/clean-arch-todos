import { Event } from "../events";

export default interface EventPublisher {
    publish<T>(event: Event<T>): Promise<void>;
}