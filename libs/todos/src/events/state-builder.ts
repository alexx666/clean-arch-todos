import { List, ListParameters, Todo } from "../entities";
import Event from "./event";
import { TodoItem } from "../queries";
import { TodoAdded, TodoDetails } from "./todo-added";
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
                    listParams.todos?.push((event as TodoAdded).toEntity());

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

    public static buildTodoStateFrom(events: Event<any>[]): TodoItem {
        const item: Partial<TodoItem> = {};

        for (const event of events) {

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
                    throw new Error("[InMemoryListTodos] Error: Unable to build object state from event stream!");
            }
        }

        return item as TodoItem;
    }
}