import { Name } from "../../value-objects";

import { ListPolicy } from "../list-policy/list-policy";
import { Todo } from "../todo/todo";

export interface ListParameters {
	name: string;
	maxTodos: number;
	allowDuplicates: boolean;
	allowExpired: boolean;
	todos?: Array<Todo>;
}

export class List {

	private name: Name;
	private todos: Array<Todo>;

	public readonly policy: ListPolicy;

	constructor(params: ListParameters) {
		const { name, todos, ...policyConfig } = params;

		this.name = Name.create(name);
		this.policy = new ListPolicy(policyConfig);
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
