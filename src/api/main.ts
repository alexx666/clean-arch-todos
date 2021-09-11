import Express, { Response } from "express";

import { config } from "dotenv";

import listRouter from "./routers/lists";
import todoRouter from "./routers/todos";

import morgan from "morgan";

config();

const API = Express();

API.use(morgan("combined"));

API.use("/lists", listRouter)
API.use("/lists/:name/todos", todoRouter)

API.use("*", (err: Error, _1: any, res: Response, _2: any) => res.status(500).json({ error: err.message }))

API.listen(process.env.PORT, () => console.log("Server listening on port", process.env.PORT));
