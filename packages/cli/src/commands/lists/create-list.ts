import { Command } from "commander";
import { CreateList, IMediator } from "@alexx666/todos-core";

export default function (mediator: IMediator) {
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

			const result = await mediator.send(request);

			console.log("List Created!");
			console.table(result);
		});
}
