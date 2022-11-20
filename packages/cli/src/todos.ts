#!/usr/bin/env node

import { config } from "dotenv";
import { readFileSync } from "fs";
import { join } from "path";

import { CLI } from "./app";

import * as commands from "./commands";

config();

const pkgPath = join(__dirname, "../package.json");
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const pkg = JSON.parse(readFileSync(pkgPath, "utf-8"));

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
const cli = new CLI(pkg.version, Object.values(commands))

void cli.start(process.argv);
