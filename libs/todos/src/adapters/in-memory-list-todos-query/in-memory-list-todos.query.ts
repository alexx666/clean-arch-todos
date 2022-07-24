import { ListTodos, ListTodosRequest, ListTodosResponse, TodoItem } from "../../queries/list-todos";
import { Todo } from "../../entities";
import { TODO_CREATED, TODO_DELETED } from "../../commands";
import Event from "../../events/event";


export default class InMemoryListTodos implements ListTodos {

    constructor(private readonly events: Event<any>[] = []) { }

    public async execute(input: ListTodosRequest): Promise<ListTodosResponse> {

        const listName = input.listName;

        const sortedTodoEvents = this.events
            .filter((event) => event.type.startsWith("Todo"))
            .filter((event: Event<Todo>) => event.details.listName.value === listName)
            .sort((event1, event2) => event1.timestamp - event2.timestamp);

        const groupedTodoEvents = this.groupById(sortedTodoEvents);

        const items: TodoItem[] = Object.keys(groupedTodoEvents)
            .reduce((todos: TodoItem[], id: string) => [
                ...todos,
                this.buildStateFrom(groupedTodoEvents[id])
            ], []);

        return {
            items,
            count: items.length,
            listName,
        }
    }

    private buildStateFrom(events: Event<Todo>[]): TodoItem {
        const item: Partial<TodoItem> = {};

        for (const event of events) {

            const todo = event.details;

            switch (event.type) {
                case TODO_CREATED:
                    item.id = todo.id;
                    item.description = todo.description;
                    item.isDeleted = false;
                    item.start = todo.startDate.toISOString();
                    item.end = todo.endDate.toISOString();
                    item.expired = todo.isExpired;

                    break;

                case TODO_DELETED:
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

    private groupById(events: Event<any>[]) {
        return events.reduce((rv: { [key: string]: Event<any>[] }, x: Event<any>) => {
            (rv[x.id] = rv[x.id] || []).push(x);
            return rv;
        }, {});
    };
}