import { Command } from "./command";

export interface CommandHandler<C extends Command, O> {
	execute(command: C): O;
}
