import { TodoGateway, Todo } from "../todos/entities/todo";

interface FindQuery {
    limit: number;
}

export default class InMemoryTodoGateway implements TodoGateway {

    private todos: Todo[];

    constructor() {
        const uniqueIds = Array(10).keys()
        const ids = Array.from(uniqueIds)
        const idStrings = ids.map(id => String(id))

        this.todos = idStrings.map(id => new Todo(id))
    }

    find(query: FindQuery): Promise<Todo[]> {
        const limit = Number(query.limit) || 20

        const results = this.todos.filter((_, i) => i < limit)

        return Promise.resolve(results)
    }
}