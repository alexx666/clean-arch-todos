import Todo from "../../../core/todos/entities/todo.entity";
import Repository from "../../../core/repository";

import { ListTodosInput } from "../../../core/todos/use-cases/query-todos/query-todos.io";

export default class InMemoryTodoRepository implements Repository<Todo> {

    private todos: Todo[];

    constructor() {
        const uniqueIds = Array(10).keys()
        const ids = Array.from(uniqueIds)
        const idStrings = ids.map(id => String(id))

        this.todos = idStrings.map(id => new Todo(id))
    }

    find(query: ListTodosInput): Promise<Todo[]> {
        const limit = Number(query.limit) || 20

        const results = this.todos.filter((_, i) => i < limit)

        return Promise.resolve(results)
    }
}