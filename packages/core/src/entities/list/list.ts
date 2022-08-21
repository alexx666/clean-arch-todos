import { Events, Event, ListDetails } from "../../events";
import { Name } from "../../value-objects";
import { ListPolicy } from "../list-policy/list-policy";
import { Todo, TodoParameters } from "../todo/todo";

export interface ListParameters {
	name: string;
	maxTodos: number;
	allowDuplicates: boolean;
	allowExpired: boolean;
	todos?: Array<Todo>;
}

export class List {
	public static buildFromStream(events: Events | Event[]): List {
		const listParams: Partial<ListParameters> = {};

		for (const { type, details } of events) {
			switch (true) {
				case type === "ListCreated":
					listParams.name = (details as ListDetails).name;
					listParams.allowDuplicates = (details as ListDetails).allowDuplicates;
					listParams.allowExpired = (details as ListDetails).allowExpired;
					listParams.maxTodos = (details as ListDetails).maxTodos;
					listParams.todos = [];

					break;

				case type === "TodoAdded":
					listParams.todos?.push(new Todo({
						...(details as TodoParameters),
						startDate: new Date((details as TodoParameters).startDate),
						endDate: new Date((details as TodoParameters).endDate),
					}));

					break;

				case type === "TodoRemoved":
					listParams.todos = listParams.todos?.filter(
						(todo) => todo.id !== details.id
					);

					break;

				default:
					throw new Error(
						"[List] Error: Unable to build object state from event stream!"
					);
			}
		}

		return new List(listParams as ListParameters);
	}

	private name: Name;
	private todos: Array<Todo>;

	public readonly policy: ListPolicy;

	constructor(params: ListParameters) {
		const { name, todos, ...policyConfig } = params;

		this.name = Name.create(name);
		this.policy = new ListPolicy(policyConfig);
		this.todos = todos ?? [];
	}

	public add(todo: Todo) {
		if (!this.policy.isAllowedToAdd(this, todo))
			throw new Error("ListError: Todo does not conform to List policy");

		this.todos.push(todo);
	}

	public remove(id: string): Todo {
		const item = this.todos.find((todo) => todo.id === id);

		if (!item) throw new Error("ListError: Todo item not found within list!");

		this.todos = this.todos.filter((todo) => todo.id !== item.id);

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
	}
}
