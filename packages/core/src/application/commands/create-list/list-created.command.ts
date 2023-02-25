import { List } from "../../../domain";
import { Command } from "../../../kernel";

// FIXME: duplicated definition
export interface ListDetails {
	id: string;
	name: string;
	maxTodos: number;
	allowDuplicates: boolean;
	allowExpired: boolean;
}

export const LIST_CREATED = "ListCreated";

/**
 * {@link Command} emitted when a new list is created.
 * Holds the details of the {@link List} in a {@link ListDetails} object
 */
export class ListCreated implements Command<ListDetails> {
	public readonly name: string = LIST_CREATED;
	public readonly params: ListDetails;

	/**
	 * @param list a {@link List} entity that was created
	 */
	constructor(list: List) {
		this.params = {
			id: list.listName,
			name: list.listName,
			maxTodos: list.policy.maxTodos,
			allowDuplicates: list.policy.allowDuplicates,
			allowExpired: list.policy.allowExpired,
		};
	}
}
