import { IListCreatedHandler, ListCreated } from "@alexx666/todos-core";

export class ListCreatedHandler implements IListCreatedHandler {

	public execute(command: ListCreated): void {
		console.log("List Created!");
		console.table(command);
	}

}
