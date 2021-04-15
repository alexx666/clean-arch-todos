import { ReadableGateway, WritableGateway } from "../../modules/shared/entity.gateway";
import { Todo } from "../../modules/todos/entities/todo";
import TodoDocument from "./todo-document";

interface FindQuery {
    limit: number;
		skip: number;
}

export default class InMemoryTodoGateway implements ReadableGateway<Todo>, WritableGateway<Todo> {

    constructor(private documents: Map<string, TodoDocument> = new Map<string, TodoDocument>()) {}

    public async delete(id: string): Promise<Todo> {
        if (!this.documents.has(id)) throw new Error("Todo does not exist!");

        const todo = this.documents.get(id);

        this.documents.delete(id);

        return new Todo(id, todo!.description, new Date(todo!.due));
    }

    public async save(todo: Todo): Promise<Todo> {
        if (this.documents.has(todo.id)) throw new Error("Todo already exists!");

        this.documents.set(todo.id, TodoDocument.fromTodo(todo));

        return todo;
    }

    public async find(query: FindQuery): Promise<Todo[]> {
        const { limit, skip } = query;

        const keys = Array.from(this.documents.keys()).filter((_, i) => i >= skip && i < limit + skip)

        const docs = keys.map(key => this.documents.get(key)!);

        return docs.map((d, i) => d.toEntity(keys[i]))
    }
}
