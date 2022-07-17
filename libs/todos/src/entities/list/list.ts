import Name from "../../value-objects/list-name";
import ListPolicy from "../list-policy/list-policy";
import Todo from "../todo/todo";

export default class List {

	constructor(
		public readonly name: Name,
		private policy: ListPolicy = new ListPolicy(10),
		private todos: Array<Todo> = new Array(),
	) { }

	public add(todo: Todo) {
		if (!this.policy.isAllowedToAdd(this)) throw new Error("ListError: List has maximum number of allowed todos");
		// if (todo.isExpired) throw new Error("ListError: Can't add an expired todo to list");
		if (this.todos.some(item => item.id === todo.id)) throw new Error("ListError: Duplicated ID for todo");

		this.todos.push(todo);
	}

	public remove(id: string): Todo {
		const item = this.todos.find(todo => todo.id === id);

		if (!item) throw new Error("ListError: Todo item not found within list!");

		this.todos = this.todos.filter(todo => todo.id !== item.id);

		return item;
	}

	public get size(): number {
		return this.todos.length;
	}

	public get items(): Array<Todo> {
		return this.todos;
	};
}
