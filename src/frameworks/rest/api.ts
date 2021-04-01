import Express from "express";
import doSomethingHandler from "./router";

const PORT = 3000;

const API = Express();

API.use("/do", doSomethingHandler)

API.listen(PORT, () => console.log("Servcer listening on port", PORT));