import { Command } from "commander";
import { CreateList, CreateListRequest } from "../../../libs/todos/boundry/create-list/create-list";

export default function (createList: CreateList) {
	return new Command("create")
		.alias("mk")
		.description("Creates new list")
		.requiredOption("-n, --list-name <list>", "List name")
		.action((cmd) => {
			try {
				const request: CreateListRequest = {
					listName: String(cmd.listName)
				}

				createList.execute(request);
			} catch (error) {
				console.error("Error:", error.message);
			}
		})
}
