import { Router } from "express";

import listRouter from "./list.router";
import createRouter from "./create.router";
import deleteRouter from "./delete.router";

const todoRouter = Router()

todoRouter.use(listRouter)
todoRouter.use(createRouter)
todoRouter.use(deleteRouter)

export default todoRouter;
