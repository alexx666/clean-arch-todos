import { ListTodos, ListTodosRequest, ListTodosResponse, TodoItem } from "../../queries/list-todos";
import { Todo } from "../../entities";

import Event from "../../events/event";
import StateBuilder from "../../events/state-builder";


export default class InMemoryListTodos implements ListTodos {

    constructor(private readonly events: Event<any>[] = []) { }

    public async execute(input: ListTodosRequest): Promise<ListTodosResponse> {

        const listName = input.listName;

        const sortedTodoEvents: Event<Todo>[] = this.events
            .filter((event) => event.type.startsWith("Todo"))
            .filter((event: Event<Todo>) => event.details.listName === listName)
            .sort((event1, event2) => event1.timestamp - event2.timestamp);

        const groupedTodoEvents = StateBuilder.groupById(sortedTodoEvents);

        const items: TodoItem[] = Object.keys(groupedTodoEvents)
            .reduce((todos: TodoItem[], id: string) => [
                ...todos,
                StateBuilder.buildTodoStateFrom(groupedTodoEvents[id])
            ], []);

        return {
            items,
            count: items.length,
            listName,
        }
    }
}