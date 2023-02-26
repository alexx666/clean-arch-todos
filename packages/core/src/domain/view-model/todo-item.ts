/**
 * Input parameters for {@link TodoItem} construction
 */
export interface TodoItemParameters {
	/**
	 * Unique identifier
	 */
	id: string;
	/**
	 * ISO compliant date string representing the starting date
	 */
	start: string;
	/**
	 * ISO compliant date string representing the todos deadline
	 */
	end: string;
	/**
	 * Boolean indicating if it has expired or not
	 */
	expired: boolean;
	/**
	 * Todo Item description
	 */
	description: string;
	/**
	 * Boolean indicating if it has been deleted (via soft delete)
	 */
	isDeleted: boolean;
}

/**
 * Read model of the {@link Todo} entity retreived when querying todos.
 */
export class TodoItem {
	public readonly id: string;
	public readonly start: string;
	public readonly end: string;
	public readonly expired: boolean;
	public readonly description: string;
	public readonly isDeleted: boolean;

	constructor(params: TodoItemParameters) {
		this.id = params.id;
		this.start = params.start;
		this.end = params.end;
		this.expired = params.expired;
		this.description = params.description;
		this.isDeleted = params.isDeleted;
	}
}
