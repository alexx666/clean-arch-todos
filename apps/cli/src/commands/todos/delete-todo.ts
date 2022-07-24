import { Command } from "commander";

import { DeleteTodo, DeleteTodoRequest } from "@alexx666/todos";

export default function (deleteTodo: DeleteTodo) {
	return new Command("delete")
		.alias("rm")
		.description("Delete todo")
		.requiredOption("-l, --list-id <list>", "List ID")
		.requiredOption("--id <id>", "todo ID")
		.action(async cmd => {
			const request: DeleteTodoRequest = { listId: cmd.listId, id: cmd.id };

			await deleteTodo.execute(request);

			console.log("Deleted todo:", cmd.id);
		});
}
