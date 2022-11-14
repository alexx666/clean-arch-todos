// Frameworks
import { Command } from "commander";

// Request/Response models
import { IListTodos, ListTodosRequest } from "@alexx666/todos-core";

export default function (listTodos: IListTodos) {
	return new Command("list")
		.alias("ls")
		.description("List todos")
		.requiredOption("-l, --list-name <list>", "List ID")
		.action(async ({ listName }) => {
			const request: ListTodosRequest = {
				listName: String(listName),
			};

			const response = await listTodos.execute(request);

			console.table(response.items);
		});
}
