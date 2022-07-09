// Frameworks
import { Command } from "commander";

// Request/Response models
import { ListTodos, ListTodosRequest } from "../../../../../libs/todos/src/boundry/list-todos/list-todos";

export default function (listTodos: ListTodos) {
	return new Command("list")
		.alias("ls")
		.description("List todos")
		.requiredOption("-n, --list-name <list>", "List name")
		.action(async cmd => {
			try {
				const request: ListTodosRequest = {
					listName: String(cmd.name),
				}

				const response = await listTodos.execute(request)

				console.table(response.items)
			} catch (error) {
				console.error("Error:", error.message);
				console.debug(error.stack)
			}
		});
}
