import Express, { Request, Response } from "express";

import { config } from "dotenv";

import listRouter from "./routers/lists";
import todoRouter from "./routers/todos";

import morgan from "morgan";
import cors from "cors";

config();

const API = Express();

API.use(cors())

API.use(morgan("combined"));

API.use("/lists", listRouter)
API.use("/lists/:listId/todos", todoRouter)

API.use("*", (err: Error, _1: Request, res: Response, _2: any) => {
    res.status(500).json({ error: err.message });
    console.debug(err.stack);
})

API.listen(process.env.PORT, () => console.log("Server listening on port", process.env.PORT));
