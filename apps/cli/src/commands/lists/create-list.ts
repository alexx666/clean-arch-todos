import { Command } from "commander";
import { CreateList, CreateListRequest } from "@alexx666/todos";

export default function (createList: CreateList) {
	return new Command("create")
		.alias("mk")
		.description("Creates new list")
		.requiredOption("-n, --list-name <list>", "List name")
		.action(async (cmd) => {
			const request: CreateListRequest = {
				listName: String(cmd.listName),
				maxTodos: Number(cmd.maxTodos ?? 10),
				allowDuplicates: Boolean(cmd.allowDuplicates ?? false),
				allowExpired: Boolean(cmd.allowExpired ?? true)
			}

			const result = await createList.execute(request);

			console.table(result);
		})
}
