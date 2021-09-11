#!/usr/bin/env node

import { program } from "commander";

import { config } from "dotenv";

config();

import lists from "./commands/lists";
import todos from "./commands/todos";

program
	.addCommand(lists)
	.addCommand(todos)

program.parse(process.argv)
