import { Command } from "./command";

export interface CommandHandler<C extends Command = Command, O = void> {
	execute(command: C): Promise<O | undefined>;
}
