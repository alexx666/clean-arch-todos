import { Router } from "express";
import { CreateListImpl } from "@alexx666/todos";

import { todoGateway } from "../../db";

import createRouter from "./create.router";

const createList = new CreateListImpl(todoGateway);

const listRouter = Router({ mergeParams: true })

listRouter.use(createRouter(createList))

export default listRouter;
