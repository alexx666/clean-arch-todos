import Express from "express";

import { config } from "dotenv";

import todoRouter from "./todos/todo.router";

config();

const API = Express();

API.use(todoRouter)

API.listen(process.env.PORT, () => console.log("Server listening on port", process.env.PORT));