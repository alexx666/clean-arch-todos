import Todo from "../../../libs/todos/entities/todo.entity";
import Repository from "../../../libs/core/repository";

export default class MockTodoRepository implements Repository<Todo> {
    find(query: any): Promise<Todo[]> {
        const limit = Number(query.limit) || 20

        const uniqueIds = Array(limit).keys()
        const ids = Array.from(uniqueIds)
        const idStrings = ids.map(id => String(id))

        return Promise.resolve(idStrings.map(id => new Todo(id)))
    }
}