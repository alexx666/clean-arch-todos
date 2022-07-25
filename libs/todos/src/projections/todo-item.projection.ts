import { Events, TodoRemoved, TodoAdded, TodoDetails } from "../events";
import { TodoItem } from "../view-model";

export default class TodoItemProjection {

    public static from(events: Events<any>): TodoItemProjection {
        return new TodoItemProjection(events);
    }

    private constructor(private readonly events: Events<any>) { }

    public build(): TodoItem {
        const item: Partial<TodoItem> = {};

        for (const event of this.events) {

            switch (true) {
                case event instanceof TodoAdded:

                    const details = event.details as TodoDetails;

                    item.id = event.id;
                    item.description = details.description;
                    item.start = details.startDate;
                    item.end = details.endDate;
                    item.expired = Date.now() > new Date(details.endDate).getTime();

                    item.isDeleted = false;

                    break;

                case event instanceof TodoRemoved:
                    item.isDeleted = true;

                    break;

                default:
                    throw new Error("[StateBuilder] Error: Unable to build object state from event stream!");
            }
        }

        return item as TodoItem;
    }
}