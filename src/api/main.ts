import Express, { NextFunction, Request, Response } from "express";

import { config } from "dotenv";

import todoRouter from "./todos/todo.router";

config();

const API = Express();

API.use("/todos", todoRouter)

API.use("*", (err: Error, _1: any, res: Response, _2: any) => res.status(500).json({ error: err.message }))

API.listen(process.env.PORT, () => console.log("Server listening on port", process.env.PORT));