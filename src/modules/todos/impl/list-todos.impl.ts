import { ReadableGateway } from "../../shared/entity.gateway";
import { ListTodos, ListTodosRequest, ListTodosResponse } from "../boundry/list-todos";
import { Todo } from "../entities/todo";

export default class ListTodosImpl implements ListTodos {

    constructor(private gateway: ReadableGateway<Todo>) {}

    public async execute(input: ListTodosRequest): Promise<ListTodosResponse> {
        const items = await this.gateway.find(input)

        return { items, count: items.length }
    }
}