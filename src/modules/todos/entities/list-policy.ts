import List from "./list";

export default class ListPolicy {
	constructor(private maxTodos: number = 10) {}

	public isAllowedToAdd(list: List): boolean {
		return this.maxTodos > list.getSize();
	}
}
