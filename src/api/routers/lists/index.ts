import { Router } from "express";
import { CreateListImpl } from "../../../libs/todos/boundry/create-list/create-list";

import { todoGateway } from "../../db";

import createRouter from "./create.router";

const createList = new CreateListImpl(todoGateway);

const listRouter = Router({ mergeParams: true })

listRouter.use(createRouter(createList))

export default listRouter;
