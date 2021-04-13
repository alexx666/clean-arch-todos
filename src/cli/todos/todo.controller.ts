import { CreateTodo, CreateTodoRequest } from "../../modules/todos/boundry/create-todo";
import { DeleteTodo, DeleteTodoRequest } from "../../modules/todos/boundry/delete-todo";
import { ListTodos, ListTodosRequest } from "../../modules/todos/boundry/list-todos";


export default class TodoController {
    constructor(private listTodos: ListTodos, private createTodo: CreateTodo, private deleteTodo: DeleteTodo) {}

    public async list(cmd: any) {
        try {
            const request: ListTodosRequest = { limit: cmd.limit }

            const result = await this.listTodos.execute(request)

            console.table(result.items)
        } catch (error) {
            console.error("Error:", error.message);
        }
    }

    public async create(cmd: any) {
        try {
            const request: CreateTodoRequest = { description: cmd.description, due: cmd.due };

            const result = await this.createTodo.execute(request);

            console.table(result)
        } catch (error) {
            console.error("Error:", error.message);
        }
    }

    public async delete(cmd: any) {
        try {
            const request: DeleteTodoRequest = { id: cmd.id };

            const { item } = await this.deleteTodo.execute(request);

            console.table(item)
        } catch (error) {
            console.error("Error:", error.message);
        }
    }
}