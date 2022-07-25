import { List, ListParameters, Todo } from "../entities";
import Event from "./event";
import { TodoItem } from "../queries";
import { TodoAdded } from "./todo-added";
import { TodoRemoved } from "./todo-removed";
import { ListCreated, ListDetails } from "./list-created";

export default class StateBuilder {

    public static groupById<T>(events: Event<T>[]) {
        return events.reduce((rv: { [key: string]: Event<T>[] }, x: Event<T>) => {
            (rv[x.id] = rv[x.id] || []).push(x);
            return rv;
        }, {});
    };

    public static buildListStateFrom(events: Event<any>[]): List {
        const listParams: Partial<ListParameters> = {};

        for (const event of events) {
            switch (true) {
                case event instanceof ListCreated:

                    const listDetails = event.details as ListDetails;

                    listParams.name = listDetails.name;
                    listParams.allowDuplicates = listDetails.allowDuplicates;
                    listParams.allowExpired = listDetails.allowExpired;
                    listParams.maxTodos = listDetails.maxTodos;
                    listParams.todos = new Array();

                    break;

                case event instanceof TodoAdded:
                    listParams.todos?.push(event.details as Todo);

                    break;

                case event instanceof TodoRemoved:
                    listParams.todos = listParams.todos?.filter(todo => todo.id !== event.id);

                    break;

                default:
                    throw new Error("[InMemoryListTodos] Error: Unable to build object state from event stream!");
            }
        }

        return new List(listParams as ListParameters);
    }

    public static buildTodoStateFrom(events: Event<Todo>[]): TodoItem {
        const item: Partial<TodoItem> = {};

        for (const event of events) {

            const todo = event.details;

            switch (true) {
                case event instanceof TodoAdded:
                    item.id = todo.id;
                    item.description = todo.description;
                    item.start = todo.startDate.toISOString();
                    item.end = todo.endDate.toISOString();
                    item.expired = todo.isExpired;

                    item.isDeleted = false;

                    break;

                case event instanceof TodoRemoved:
                    item.isDeleted = true;

                    break;

                default:
                    throw new Error("[InMemoryListTodos] Error: Unable to build object state from event stream!");
            }
        }

        return item as TodoItem;
    }
}