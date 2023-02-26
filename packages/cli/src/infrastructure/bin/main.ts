#!/usr/bin/env node

import { config } from "dotenv";

import { readFileSync } from "fs";
import { join } from "path";

import { CLI, commands } from "../cli";

const pkgPath = join(__dirname, "./package.json");
const pkg = JSON.parse(readFileSync(pkgPath, "utf-8"));

const cli = new CLI(pkg.version, Object.values(commands));

config();

void cli.start(process.argv);
