import { Todo } from "../../modules/todos/entities/todo";

export default class TodoDocument {

	public static fromTodo(todo: Todo): TodoDocument {
		if (!todo) throw new Error("ValidationError: No todo provided!")
		return new TodoDocument(todo.description, todo.due.toISOString());
	}

  constructor(public readonly description: string, public readonly due: string) {
		if (!description) throw new Error("ValidationError: Description not provided!")
		if (!due) throw new Error("ValidationError: Due date not provided!")
	}

	public toEntity(id: string): Todo {
		return new Todo(id, this.description, new Date(this.due));
	}
}
