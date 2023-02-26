import { Command } from "./command";

export interface CommandHandler<C extends Command = Command, O = Promise<void>> {
	execute(command: C): O;
}
