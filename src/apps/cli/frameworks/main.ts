#!/usr/bin/env node

import "./config"

import { program } from "commander";
import doSomething from "./command";

program.addCommand(doSomething);

program.parse(process.argv)