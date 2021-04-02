#!/usr/bin/env node

import { program } from "commander";
import doSomething from "./command";

program.addCommand(doSomething);

program.parse(process.argv)