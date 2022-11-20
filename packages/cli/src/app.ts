import { Command, program } from "commander";

export class CLI {
	constructor(
		version: string,
		availableCommands: Command[],
	) {

		program.version(version);

		for (const command of availableCommands) {
			program.addCommand(command);
		}
	}

	public async start(args: string[]) {
		try {
			await program.parseAsync(args);
		} catch (error) {
			console.error("Error:", (error as Error).message);
			console.debug((error as Error).stack);
		}
	}
}
