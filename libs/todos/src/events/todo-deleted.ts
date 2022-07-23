import { TodoDeleted } from "../commands/delete-todo/delete-todo";
import { Subscriber } from "../ports/event.subscriber";
import Event from "./event";

export default class TodoDeletedHandler implements Subscriber<TodoDeleted>  {
    async handle(event: Event<TodoDeleted>) {
        console.log(event);
    }
}