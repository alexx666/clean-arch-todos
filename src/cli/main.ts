#!/usr/bin/env node

import { program } from "commander";

import { config } from "dotenv";

config();

import todos from "./commands/todo.command";

program.addCommand(todos);

program.parse(process.argv)