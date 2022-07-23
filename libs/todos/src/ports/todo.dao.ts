import { TodoItem } from "../queries/list-todos/list-todos";

export default interface TodoDao {
    find(listName: string): Promise<TodoItem[]>;
}