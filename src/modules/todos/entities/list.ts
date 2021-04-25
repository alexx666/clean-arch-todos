import ListPolicy from "./list-policy";
import Todo from "./todo";

export default class List {

	constructor(
		public readonly name: string,
		private size: number = 0,
		private policy: ListPolicy = new ListPolicy(10),
	) {}

	add(todo: Todo) {
		if (!this.policy.isAllowedToAdd(this)) throw new Error("ListError: List has maximum number of allowed todos");
		if (todo.isExpired) throw new Error("ListError: Can't add an expired todo to list");

		// TODO: find a way to persist the todos w/o detailing method
		this.size += 1;
	}

	remove(todo: Todo) {
		// TODO: implement
		this.size -= 1;
	}

	getSize(): number {
		return this.size;
	}
}
