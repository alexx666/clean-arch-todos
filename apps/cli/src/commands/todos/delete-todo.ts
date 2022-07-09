import { Command } from "commander";

import { DeleteTodo, DeleteTodoRequest } from "@alexx666/todos";

export default function (deleteTodo: DeleteTodo) {
	return new Command("delete")
		.alias("rm")
		.description("Delete todo")
		.requiredOption("-n, --list-name <list>", "List name")
		.requiredOption("--id <id>", "todo ID")
		.action(async cmd => {
			try {
				const request: DeleteTodoRequest = { listName: cmd.listName, id: cmd.id };

				const { item } = await deleteTodo.execute(request);

				console.table(item)
			} catch (error) {
				console.error("Error:", error.message);
			}
		});
}
