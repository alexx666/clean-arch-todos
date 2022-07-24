import List from "../list/list";
import Todo from "../todo/todo";

interface PolicyParameters {
	maxTodos: number;
	allowDuplicates: boolean
}

export default class ListPolicy {

	private readonly maxTodos: number;
	private readonly allowDuplicates: boolean;

	constructor(params: PolicyParameters) {
		this.maxTodos = params.maxTodos;
		this.allowDuplicates = params.allowDuplicates;
	}

	public isAllowedToAdd(list: List, todo: Todo): boolean {

		const containsItem = list.items.some(item => item.id === todo.id);

		const doesNotExceedLimit = this.maxTodos > list.size;

		return this.allowDuplicates ? doesNotExceedLimit : (doesNotExceedLimit && !containsItem);
	}
}
