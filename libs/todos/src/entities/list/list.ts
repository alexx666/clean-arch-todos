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

		for (const event of events) {
			switch (true) {
				case event.type === "ListCreated":
					const listDetails = event.details as ListDetails;

					listParams.name = listDetails.name;
					listParams.allowDuplicates = listDetails.allowDuplicates;
					listParams.allowExpired = listDetails.allowExpired;
					listParams.maxTodos = listDetails.maxTodos;
					listParams.todos = new Array();

					break;

				case event.type === "TodoAdded":
					const todoParams = {
						...(event.details as TodoParameters),
						startDate: new Date(event.details.startDate),
						endDate: new Date(event.details.endDate),
					};

					listParams.todos?.push(new Todo(todoParams));

					break;

				case event.type === "TodoRemoved":
					listParams.todos = listParams.todos?.filter(
						(todo) => todo.id !== event.details.id
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
		this.todos = todos ?? new Array();
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
