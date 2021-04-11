import { TodoGateway, Todo } from "../todos/entities/todo";

interface FindQuery {
    limit: number;
}

interface TodoDocument {
    description: string,
    timestamp: string;
}

export default class InMemoryTodoGateway implements TodoGateway {

    private documents: Map<string, TodoDocument>;

    constructor() {
        this.documents = new Map<string, TodoDocument>()
    }

    public async save(todo: Todo): Promise<Todo> {
        if (this.documents.has(todo.id)) throw new Error("Todo already exists!");

        this.documents.set(todo.id, { description: todo.description, timestamp: todo.timestamp.toISOString() });

        return todo;
    }

    public async find(query: FindQuery): Promise<Todo[]> {
        const limit = Number(query.limit) || 20

        const keys = Array.from(this.documents.keys()).filter((_, i) => i < limit)

        const docs = keys.map(key => this.documents.get(key)!);

        return docs.map((d, i) => new Todo(keys[i], d.description, new Date(d.timestamp)))
    }
}