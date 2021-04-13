import { ListTodos, ListTodosRequest, ListTodosResponse } from "../boundry/list-todos";

export default class ListTodosMock implements ListTodos {
    execute(input: ListTodosRequest): Promise<ListTodosResponse> {
        throw new Error("Method not implemented.");
    }
}