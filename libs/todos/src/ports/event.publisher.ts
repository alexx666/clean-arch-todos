import { Event } from "../events";

export default interface EventPublisher {
    publish(event: Event): Promise<void>;
}