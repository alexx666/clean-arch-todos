#!/usr/bin/env node

import { program } from "commander";

import { config } from "dotenv";

config();

import lists from "./commands/lists";
import todos from "./commands/todos";

async function start(args: string[]) {
	program.addCommand(lists).addCommand(todos);

	try {
		await program.parseAsync(args);
	} catch (error) {
		console.error("Error:", (error as Error).message);
		console.debug((error as Error).stack);
	}
}

void start(process.argv);
