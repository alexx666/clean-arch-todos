import { Todo } from "../entities";
import Event from "./event";
import { TodoItem } from "../queries";
import TodoAdded from "./todo-added";
import TodoRemoved from "./todo-removed";

export default class StateBuilder {

    public static groupById<T>(events: Event<T>[]) {
        return events.reduce((rv: { [key: string]: Event<T>[] }, x: Event<T>) => {
            (rv[x.id] = rv[x.id] || []).push(x);
            return rv;
        }, {});
    };

    public static buildTodoStateFrom(events: Event<Todo>[]): TodoItem {
        const item: Partial<TodoItem> = {};

        for (const event of events) {

            const todo = event.details;

            switch (true) {
                case event instanceof TodoAdded:
                    item.id = todo.id;
                    item.description = todo.description;
                    item.isDeleted = false;
                    item.start = todo.startDate.toISOString();
                    item.end = todo.endDate.toISOString();
                    item.expired = todo.isExpired;

                    break;

                case event instanceof TodoRemoved:
                    item.id = todo.id;
                    item.description = todo.description;
                    item.isDeleted = true;
                    item.start = todo.startDate.toISOString();
                    item.end = todo.endDate.toISOString();
                    item.expired = todo.isExpired;

                    break;

                default:
                    throw new Error("[InMemoryListTodos] Error: Unable to build object state from event stream!");
            }
        }

        return item as TodoItem;
    }
}