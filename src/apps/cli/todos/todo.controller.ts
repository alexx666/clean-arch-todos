import QueryTodosInteractor from "../../../core/todos/use-cases/query-todos/query-todos.interactor";

export default class CLITodoController {
    constructor(private todos: QueryTodosInteractor) {}

    list(cmd: any) {
        this.todos.list({ limit: cmd.limit })
    }
}