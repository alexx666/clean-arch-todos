#!/usr/bin/env node

import { config } from "dotenv";
import { readFileSync } from "fs";
import { join } from "path";

import { CLI } from "./app";

import * as commands from "./commands";

config();

const pkgPath = join(__dirname, "../package.json");
const pkg = JSON.parse(readFileSync(pkgPath, "utf-8"));

const cli = new CLI(pkg.version, Object.values(commands))

void cli.start(process.argv);
