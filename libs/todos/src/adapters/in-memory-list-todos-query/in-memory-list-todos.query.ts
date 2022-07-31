import { ListTodos, ListTodosRequest, ListTodosResponse } from "../../queries";
import { Todo } from "../../entities";
import { Events, Event } from "../../events";
import { TodoItem } from "../../view-model";


export default class InMemoryListTodos implements ListTodos {

    constructor(private readonly events: Events = new Events()) { }

    public async execute(input: ListTodosRequest): Promise<ListTodosResponse> {

        const listName = input.listName;

        const sortedTodoEvents = this.events
            .filter((event) => event.stream === `List:${listName}`)
            .filter((event) => event.type.startsWith("Todo"))
            .sort((event1, event2) => event1.timestamp - event2.timestamp);

        const groupedTodoEvents = new Events(...sortedTodoEvents).groupById();

        const items: TodoItem[] = Object.keys(groupedTodoEvents)
            .reduce((todos: TodoItem[], id: string) => [
                ...todos,
                TodoItem.buildFromStream(groupedTodoEvents[id]),
            ], []);

        const active = items.filter(item => !item.isDeleted)

        return {
            items,
            count: active.length,
            listName,
        }
    }
}