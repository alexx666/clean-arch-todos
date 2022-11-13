import { Command } from "commander";
import { CreateList } from "@alexx666/todos-core";

import { CreateListImpl } from "../../boundry/create-list/create-list";

export default function (createListHandler: CreateListImpl) {
	return new Command("create")
		.alias("mk")
		.description("Creates new list")
		.requiredOption("-n, --list-name <list>", "List name")
		.action(async ({ listName, maxTodos, allowDuplicates, allowExpired }) => {
			const request = new CreateList({
				listName: String(listName),
				maxTodos: Number(maxTodos ?? 10),
				allowDuplicates: Boolean(allowDuplicates ?? false),
				allowExpired: Boolean(allowExpired ?? true),
			});

			const result = await createListHandler.execute(request);

			console.table(result);
		});
}
