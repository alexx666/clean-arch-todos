import { ITodoRemovedHandler, TodoRemoved } from "@alexx666/todos-core";

export class TodoRemovedHandler implements ITodoRemovedHandler {

	public execute(command: TodoRemoved): void {
		console.log("Todo Removed!");
		console.table(command);
	}

}
