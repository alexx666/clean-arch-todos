import { Todo } from "../entities/todo";
import EntityGateway from "../../core/entity.gateway";

import { IListTodos, ListTodosRequest, ListTodosResponse } from "../boundry/list-todos";

export default class ListTodos implements IListTodos {

    constructor(private gateway: EntityGateway<Todo>) {}

    public async execute(input: ListTodosRequest): Promise<ListTodosResponse> {
        const items = await this.gateway.find(input)

        return { items, count: items.length }
    }
}