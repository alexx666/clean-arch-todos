import { ListTodosResponse, TodoItem } from "../../boundry/list-todos/list-todos";
import List from "../../entities/list/list";
import Todo from "../../entities/todo/todo";
import Name from "../../value-objects/list-name";

export default class HttpClientMapper {

    public static fromTodoItem(item: TodoItem): Todo {
        return new Todo({
            id: item.id,
            description: item.description,
            startDate: new Date(item.start),
            endDate: new Date(item.end)
        });
    }

    public static fromListTodosResponse(response: ListTodosResponse): List {
        const name = Name.create(response.listName);
        const items = response.items.map(item => this.fromTodoItem(item));

        return new List(name, undefined, items);
    }
}