import Name from "../../value-objects/list-name";
import ListPolicy from "../list-policy/list-policy";
import Todo from "../todo/todo";

interface ListParameters {
	name: string;
	maxTodos: number;
	allowDuplicates: boolean;
	todos?: Array<Todo>;
}

export default class List {

	private name: Name;
	private policy: ListPolicy;
	private todos: Array<Todo>;

	constructor(params: ListParameters) {
		const { name, todos, maxTodos, allowDuplicates } = params;

		this.name = Name.create(name);
		this.policy = new ListPolicy({ maxTodos, allowDuplicates });
		this.todos = todos ?? new Array();
	}

	public add(todo: Todo) {
		if (!this.policy.isAllowedToAdd(this, todo)) throw new Error("ListError: Todo does not conform to List policy");

		this.todos.push(todo);
	}

	public remove(id: string): Todo {
		const item = this.todos.find(todo => todo.id === id);

		if (!item) throw new Error("ListError: Todo item not found within list!");

		this.todos = this.todos.filter(todo => todo.id !== item.id);

		return item;
	}

	public get listName(): string {
		return this.name.value;
	}

	public get size(): number {
		return this.todos.length;
	}

	public get items(): Array<Todo> {
		return this.todos;
	};
}
