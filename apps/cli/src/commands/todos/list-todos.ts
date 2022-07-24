// Frameworks
import { Command } from "commander";

// Request/Response models
import { ListTodos, ListTodosRequest } from "@alexx666/todos";

export default function (listTodos: ListTodos) {
	return new Command("list")
		.alias("ls")
		.description("List todos")
		.requiredOption("-l, --list-id <list>", "List ID")
		.action(async cmd => {
			const request: ListTodosRequest = {
				listId: String(cmd.listId),
			}

			const response = await listTodos.execute(request)

			console.table(response.items)
		});
}
