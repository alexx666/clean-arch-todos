import { Command } from "commander";
import { CreateList, CreateListRequest } from "@alexx666/todos";

export default function (createList: CreateList) {
	return new Command("create")
		.alias("mk")
		.description("Creates new list")
		.requiredOption("-n, --list-name <list>", "List name")
		.action((cmd) => {
			const request: CreateListRequest = {
				listName: String(cmd.listName),
				allowDuplicates: Boolean(cmd.allowDuplicates ?? false),
				maxTodos: Number(cmd.maxTodos ?? 10),
			}

			createList.execute(request);
		})
}
