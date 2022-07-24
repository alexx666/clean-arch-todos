import List from "../list/list";
import Todo from "../todo/todo";

interface PolicyParameters {
	maxTodos: number;
	allowDuplicates: boolean;
	allowExpired: boolean;
}

export default class ListPolicy {

	private readonly maxTodos: number;
	private readonly allowDuplicates: boolean;
	private readonly allowExpired: boolean;

	constructor(params: PolicyParameters) {
		this.maxTodos = params.maxTodos;
		this.allowDuplicates = params.allowDuplicates;
		this.allowExpired = params.allowExpired;
	}

	public isAllowedToAdd(list: List, todo: Todo): boolean {

		const listContainsItem = list.items.some(item => item.id === todo.id);

		const doesNotExceedLimit = this.maxTodos > list.size;

		if (!this.allowExpired && todo.isExpired) return false;
		if (!this.allowDuplicates && listContainsItem) return false;

		return doesNotExceedLimit;
	}
}
