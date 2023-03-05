import { TodoItem } from "../../domain";

/**
 * Query request specifying the Todos to be returned
 */
export interface ListTodosRequest {
	/**
	 * String value of the id of the list
	 */
	listId: string;
}

/**
 * Query response object holding all matching Todos represented as {@link TodoItem}
 */
export interface ListTodosResponse {
	/**
	 * Todo items matching the query
	 */
	items: TodoItem[];
	/**
	 * List id to which the todos belong
	 */
	listId: string;
	/**
	 * Number of all todos found
	 */
	count: number;
}

/**
 * Query interactor listing todo items belonging to a specific list.
 */
export interface IListTodos {
	execute(input: ListTodosRequest): Promise<ListTodosResponse>;
}
