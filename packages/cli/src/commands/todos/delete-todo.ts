import { Command } from "commander";

import { DeleteTodo, DeleteTodoRequest } from "@alexx666/todos";

export default function (deleteTodo: DeleteTodo) {
	return new Command("delete")
		.alias("rm")
		.description("Delete todo")
		.requiredOption("-l, --list-name <list>", "List ID")
		.requiredOption("--id <id>", "todo ID")
		.action(async ({ listName, id }) => {
			const request: DeleteTodoRequest = { listName: String(listName), id: String(id) };

			await deleteTodo.execute(request);

			console.log("Deleted todo:", id);
		});
}
