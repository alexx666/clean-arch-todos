import { TodoItem } from "../../infrastructure/domain";

/**
 * Query request specifying the Todos to be returned
 */
export interface ListTodosRequest {
	/**
	 * String value of the name of the list
	 */
	listName: string;
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
	 * List name to which the todos belong
	 */
	listName: string;
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
