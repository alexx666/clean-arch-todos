import Event from "../../../events/event";
import TodoDao from "../../../ports/todo.dao";
import { TodoItem } from "../../../queries/list-todos/list-todos";

export default class InMemoryTodoDao implements TodoDao {

    constructor(private readonly events: Event<any>[] = []) { }

    // TODO: reconstruct context from events
    public async find(listName: string): Promise<TodoItem[]> {
        throw new Error("[InMemoryTodoDao] Not implemented yet!");
    }

}