import { IListTodos, ListTodosRequest } from "../../todos/boundry/list-todos";

export default class TodoController {
    constructor(private listTodos: IListTodos) {}

    async list(cmd: any) {

        try {
            const request: ListTodosRequest = { limit: cmd.limit }

            const result = await this.listTodos.execute(request)

            console.table(result.items)
        } catch (error) {
            console.error(error.message);
        }
    }
}