import { Command } from "commander";

import { CreateTodo, CreateTodoRequest } from "@alexx666/todos-core";

export default function (createTodo: CreateTodo) {
	return new Command("create")
		.alias("mk")
		.description("Create todo")
		.requiredOption("-l, --list-name <list>", "List ID")
		.requiredOption("-d, --description <description>", "todo description")
		.requiredOption("-s, --start <start>", "todo start date in ISO format")
		.requiredOption("-e, --end <end>", "todo end date in ISO format")
		.action(async ({ listName, description, start, end }) => {
			const request: CreateTodoRequest = {
				listName: String(listName),
				description: String(description),
				start: String(start),
				end: String(end),
			};

			const result = await createTodo.execute(request);

			console.table(result);
		});
}
