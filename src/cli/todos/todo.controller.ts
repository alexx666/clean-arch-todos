import { CreateTodoRequest, CreateTodo } from "../../todos/boundry/create-todo";
import { ListTodos, ListTodosRequest } from "../../todos/boundry/list-todos";

export default class TodoController {
    constructor(private listTodos: ListTodos, private createTodo: CreateTodo) {}

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