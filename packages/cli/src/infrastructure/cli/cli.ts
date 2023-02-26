import { registry } from "tsyringe";
import { Command, program } from "commander";

import { UUIDS } from "@todos/core";

import { Client } from "../data-access";

import { randomUUID } from "crypto";

@registry([
	{ token: Client, useValue: new Client() },
	{ token: UUIDS, useValue: { generate: () => randomUUID() } }
])
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
