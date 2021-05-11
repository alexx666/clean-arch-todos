import ListPolicy from "../list-policy/list-policy";
import Todo from "../todo/todo";

export default class List {

	constructor(
		public readonly name: string,
		private policy: ListPolicy = new ListPolicy(10),
		private todos: Set<Todo> = new Set<Todo>(),
	) { }

	public add(todo: Todo) {
		if (!this.policy.isAllowedToAdd(this)) throw new Error("ListError: List has maximum number of allowed todos");
		if (todo.isExpired) throw new Error("ListError: Can't add an expired todo to list");

		this.todos.add(todo);
	}

	public remove(id: number): Todo {
		const item = this.items[id]
		this.todos.delete(item);
		return item;
	}

	public get size(): number {
		return this.todos.size;
	}

	public get items(): Todo[] {
		return Array.from(this.todos);
	};
}
