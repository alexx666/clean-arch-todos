import { ReadableGateway } from "../../core/entity.gateway";
import { IListTodos, ListTodosRequest, ListTodosResponse } from "../boundry/list-todos";
import { Todo } from "../entities/todo";

export default class ListTodos implements IListTodos {

    constructor(private gateway: ReadableGateway<Todo>) {}

    public async execute(input: ListTodosRequest): Promise<ListTodosResponse> {
        const items = await this.gateway.find(input)

        return { items, count: items.length }
    }
}