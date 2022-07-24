import { ListTodos, ListTodosRequest, ListTodosResponse } from "../../queries/list-todos";
import Event from "../../events/event";

export default class InMemoryListTodos implements ListTodos {

    constructor(private readonly events: Event<any>[] = []) { }

    // TODO: implement read model projection
    public async execute(input: ListTodosRequest): Promise<ListTodosResponse> {
        throw new Error("[InMemoryListTodo] Not implemented yet!");
    }
}