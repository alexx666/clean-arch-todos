// Frameworks
import { Command } from "commander";

// Request/Response models
import { ListTodos, ListTodosRequest } from "@alexx666/todos";

export default function (listTodos: ListTodos) {
	return new Command("list")
		.alias("ls")
		.description("List todos")
		.requiredOption("-n, --list-name <list>", "List name")
		.action(async cmd => {
			const request: ListTodosRequest = {
				listName: String(cmd.listName),
			}

			const response = await listTodos.execute(request)

			console.table(response.items)
		});
}
