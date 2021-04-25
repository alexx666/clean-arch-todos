import Todo from "../../modules/todos/entities/todo";

export default class TodoDocument {

	public static fromTodo(todo: Todo): TodoDocument {
		if (!todo) throw new Error("ValidationError: No todo provided!");

		return new TodoDocument(
			todo.list,
			todo.description,
			todo.start.toISOString(),
			todo.end.toISOString(),
		);
	}

  constructor(
		public readonly listName: string,
		public readonly description: string,
		public readonly start: string,
		public readonly end: string,
	) {}

	public toEntity(id: string): Todo {
		return new Todo(id, this.listName, this.description, new Date(this.start), new Date(this.end));
	}
}
