import { Command } from "commander";
import { CreateList, CreateListRequest } from "@alexx666/todos";

export default function (createList: CreateList) {
	return new Command("create")
		.alias("mk")
		.description("Creates new list")
		.requiredOption("-n, --list-name <list>", "List name")
		.action(async ({ listName, maxTodos, allowDuplicates, allowExpired }) => {
			const request: CreateListRequest = {
				listName: String(listName),
				maxTodos: Number(maxTodos ?? 10),
				allowDuplicates: Boolean(allowDuplicates ?? false),
				allowExpired: Boolean(allowExpired ?? true),
			};

			const result = await createList.execute(request);

			console.table(result);
		});
}
