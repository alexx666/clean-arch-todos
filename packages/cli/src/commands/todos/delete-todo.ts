import { Command } from "commander";

import { DeleteTodo, DeleteTodoParameters } from "@alexx666/todos-core";
import { DeleteTodoImpl } from "../../boundry/delete-todo/delete-todo";

export default function (handler: DeleteTodoImpl) {
	return new Command("delete")
		.alias("rm")
		.description("Delete todo")
		.requiredOption("-l, --list-name <list>", "List ID")
		.requiredOption("--id <id>", "todo ID")
		.action(async ({ listName, id }) => {
			const request: DeleteTodoParameters = { listName: String(listName), id: String(id) };

			await handler.execute(new DeleteTodo(request));

			console.log("Deleted todo:", id);
		});
}
