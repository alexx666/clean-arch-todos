import Todo from "../../entities/todo.entity";
import QueryTodosInteractor from "./query-todos.interactor";
import Repository from "../../../repository";
import Presenter from "../../../presenter";

import { ListTodosOutput, ListTodosInput } from "./query-todos.io";

export default class QueryTodos implements QueryTodosInteractor {

    constructor(private gateway: Repository<Todo>, private presenter?: Presenter) {}

    public list(input: ListTodosInput, _?: any): Promise<ListTodosOutput>;

    public list(input: ListTodosInput, callback: (error?: Error, output?: ListTodosOutput) => void): void;

    public async list(input: ListTodosInput, callback?: (error?: Error, output?: ListTodosOutput) => void): Promise<any> {
        try {
            const items = await this.gateway.find(input)

            const listTodosOutput: ListTodosOutput = { items, count: items.length }

            if (callback) callback(undefined, listTodosOutput)
            if (this.presenter) this.presenter.present(listTodosOutput)

            return listTodosOutput
        } catch (error) {
            if (callback) callback(error, undefined)
            if (this.presenter) this.presenter.present(error)
            else throw error;
        }
    }
}