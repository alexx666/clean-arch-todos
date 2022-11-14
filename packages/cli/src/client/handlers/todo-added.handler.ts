import { ITodoAddedHandler, TodoAdded } from "@alexx666/todos-core";

export class TodoAddedHandler implements ITodoAddedHandler {

	public execute(command: TodoAdded): void {
		console.log("Todo Added!");
		console.table(command);
	}

}
