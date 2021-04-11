import { TodoGateway } from "../entities/todo";

import { IListTodos, ListTodosRequest, ListTodosResponse } from "../boundry/list-todos";

export default class ListTodos implements IListTodos {

    constructor(private gateway: TodoGateway) {}

    public async execute(input: ListTodosRequest): Promise<ListTodosResponse> {
        const items = await this.gateway.find(input)

        return { items, count: items.length }
    }
}