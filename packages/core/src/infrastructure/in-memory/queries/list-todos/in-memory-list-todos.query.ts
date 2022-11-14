import { IListTodos, ListTodosRequest, ListTodosResponse } from "../../../../application";
import { Events } from "../../../../shared";
import { TodoItem } from "../../../../domain";

export class InMemoryListTodos implements IListTodos {
	constructor(private readonly events: Events = new Events()) { }

	public execute(input: ListTodosRequest): Promise<ListTodosResponse> {
		const listName = input.listName;

		const sortedTodoEvents = this.events
			.filter((event) => event.stream === `List:${listName}`)
			.filter((event) => event.name.startsWith("Todo"))
			.sort((event1, event2) => event1.timestamp - event2.timestamp);

		const groupedTodoEvents = new Events(...sortedTodoEvents).groupById();

		const items: TodoItem[] = Object.keys(groupedTodoEvents).reduce(
			(todos: TodoItem[], id: string) => [
				...todos,
				TodoItem.buildFromStream(groupedTodoEvents[id]),
			],
			[]
		);

		const active = items.filter((item) => !item.isDeleted);

		return Promise.resolve({
			items,
			count: active.length,
			listName,
		});
	}
}
