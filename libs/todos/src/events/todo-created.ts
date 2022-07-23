import { TodoCreated } from "../commands/create-todo/create-todo";
import { Subscriber } from "../ports/event.subscriber";

import Event from "./event";

export default class TodoCreatedHandler implements Subscriber<TodoCreated> {
    async handle(event: Event<TodoCreated>) {
        console.log(event);
    }
}