import { CommandHandler } from "../../shared";
import { TodoAdded } from "./todo-added.event";

export class TodoAddedHandler implements CommandHandler<TodoAdded, void> {
	public execute(command: TodoAdded): void {
		console.log("Handling event", command.name, "with details", JSON.stringify(command.params));
	}

}
