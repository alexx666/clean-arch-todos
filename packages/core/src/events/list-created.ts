import { List } from "../entities";
import { DomainEvent } from "./event";

// FIXME: duplicated definition
export interface ListDetails {
	id: string;
	name: string;
	maxTodos: number;
	allowDuplicates: boolean;
	allowExpired: boolean;
}

/**
 * {@link DomainEvent} emitted when a new list is created.
 * Holds the details of the {@link List} in a {@link ListDetails} object
 */
export class ListCreated implements DomainEvent<ListDetails> {
	public readonly type: string = "ListCreated";
	public readonly details: ListDetails;
	public readonly timestamp: number = Date.now();
	public readonly stream: string;

	/**
	 * @param list a {@link List} entity that was created
	 */
	constructor(list: List) {
		this.stream = this.stream = `List:${list.listName}`;

		this.details = {
			id: list.listName,
			name: list.listName,
			maxTodos: list.policy.maxTodos,
			allowDuplicates: list.policy.allowDuplicates,
			allowExpired: list.policy.allowExpired,
		};
	}
}
