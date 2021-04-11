import { CreateTodoRequest, ICreateTodo } from "../../todos/boundry/create-todo";
import { IListTodos, ListTodosRequest } from "../../todos/boundry/list-todos";

export default class TodoController {
    constructor(private listTodos: IListTodos, private createTodo: ICreateTodo) {}

    async list(cmd: any) {
        try {
            const request: ListTodosRequest = { limit: cmd.limit }

            const result = await this.listTodos.execute(request)

            console.table(result.items)
        } catch (error) {
            console.error("Error:", error.message);
        }
    }

    async create(cmd: any) {
        try {
            const request: CreateTodoRequest = { description: cmd.description };

            const result = await this.createTodo.execute(request);

            console.table(result)
        } catch (error) {
            console.error("Error:", error.message);
        }
    }
}