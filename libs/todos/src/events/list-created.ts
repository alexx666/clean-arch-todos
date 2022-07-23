import { ListCreatedEvent } from "../commands/create-list/create-list";
import { Subscriber } from "../ports/event.subscriber";
import Event from "./event";

export default class ListCreatedHandler implements Subscriber<ListCreatedEvent> {
    async handle(event: Event<ListCreatedEvent>) {
        console.log(event);
    }
}