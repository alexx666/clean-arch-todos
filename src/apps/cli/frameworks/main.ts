#!/usr/bin/env node

import { program } from "commander";

process.env.HOST = "localhost";
process.env.PORT = String(3000);

import todos from "./todo.command";

program.addCommand(todos);

program.parse(process.argv)