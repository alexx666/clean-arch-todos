import Express from "express";

import todoRouter from "./todo.router";

const PORT = 3000;

const API = Express();

API.use(todoRouter)

API.listen(PORT, () => console.log("Servcer listening on port", PORT));