import { Router } from "express";
import { CreateListImpl } from "@alexx666/todos";

import { providers } from "../../di";

import createRouter from "./create.router";

const createList = new CreateListImpl(providers);

const listRouter = Router({ mergeParams: true })

listRouter.use(createRouter(createList))

export default listRouter;
