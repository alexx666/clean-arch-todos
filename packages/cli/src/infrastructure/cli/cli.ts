import { Command, program } from "commander";

export class CLI {
	constructor(version: string, availableCommands: Command[]) {
		program.version(version);

		for (const command of availableCommands) {
			program.addCommand(command);
		}
	}

	public async start(args: string[]) {
		let exitCode = 0;
		try {
			await program.parseAsync(args);
		} catch (error) {
			console.error("Error:", error);
			exitCode = 1;
		}

		process.exit(exitCode);
	}
}
