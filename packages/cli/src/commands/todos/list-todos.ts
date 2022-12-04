// Frameworks
import { Command } from "commander";

// Request/Response models
import { IListTodos, ListTodosRequest } from "@todos/core";

export default function (handler: IListTodos) {
	return new Command("list")
		.alias("ls")
		.description("List todos")
		.requiredOption("-l, --list-name <list>", "List ID")
		.action(async ({ listName }) => {
			const request: ListTodosRequest = {
				listName: String(listName),
			};

			const response = await handler.execute(request);

			console.table(response.items);
		});
}
