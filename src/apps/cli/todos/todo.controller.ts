import QueryTodosInteractor from "../../../core/todos/use-cases/query-todos/query-todos.interactor";

export default class TodoController {
    constructor(private queryTodos: QueryTodosInteractor) {}

    list(cmd: any) {
        this.queryTodos.list({ limit: cmd.limit })
    }
}