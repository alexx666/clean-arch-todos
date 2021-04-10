import Presenter from "../../../presenter";
import { ListTodosInput, ListTodosOutput } from "./query-todos.io";

export default interface QueryTodosInteractor {
    /**
     * Lists all todos that satisfy the query
     * @param input ListTodosInput
     * @returns Promise which when resolved will provide a ListTodosOutput
     */
    list(input: ListTodosInput): Promise<ListTodosOutput>;

    /**
     * Lists all todos that satisfy the query
     * @param input ListTodosInput
     * @param callback Callback to execute after retreiving the result
     */
    list(input: ListTodosInput, callback?: (error?: Error, output?: ListTodosOutput) => void): void;
}