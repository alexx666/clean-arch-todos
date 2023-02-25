import { CommandHandler } from "../../../kernel";
import { TodoAdded } from "./todo-added.command";

export type ITodoAddedHandler = CommandHandler<TodoAdded, void>;

export class TodoAddedHandler implements ITodoAddedHandler {
	public execute(command: TodoAdded): void {
		console.log(
			"Handling event",
			command.name,
			"with details",
			JSON.stringify(command.params)
		);
	}
}
