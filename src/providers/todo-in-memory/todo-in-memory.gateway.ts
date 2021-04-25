import { Gateway } from "../../modules/shared/entity.gateway";
import Todo from "../../modules/todos/entities/todo";
import TodoDocument from "./todo-document";

interface FindQuery {
		listName: string;
    limit: number;
		marker?: string;
}

export default class InMemoryTodoGateway implements Gateway<Todo> {

    constructor(private documents: Map<string, TodoDocument> = new Map<string, TodoDocument>()) {}

		public async count(query: FindQuery): Promise<number> {
			const docValues = Array.from(this.documents.values())

			return docValues.filter(td => td.listName === query.listName).length
		}

    public async delete(_: string, id: string): Promise<Todo> {
        if (!this.documents.has(id)) throw new Error("Todo does not exist!");

        const todo = this.documents.get(id);

        this.documents.delete(id);

        return new Todo(id, todo!.listName, todo!.description, new Date(todo!.start), new Date(todo!.end));
    }

    public async save(todo: Todo): Promise<Todo> {
        if (this.documents.has(todo.id)) throw new Error("Todo already exists!");

        this.documents.set(todo.id, TodoDocument.fromTodo(todo));

        return todo;
    }

    public async find(query: FindQuery): Promise<Todo[]> {
        const { limit, marker, listName } = query;

        const entries = Array.from(this.documents.entries())

				const keys = entries
					.filter(td => td[1].listName === listName)
					.map(td => td[0])

				const offset = marker ? keys.indexOf(marker) + 1 : 0;

				const pageKeys = keys.filter((_, i) => i >= offset && i < limit + offset);

        return pageKeys.map(key => this.documents.get(key)!.toEntity(key));
    }
}
