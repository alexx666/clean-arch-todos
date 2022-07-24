import { Router } from "express";

import listRouter from "./list.router";
import createRouter from "./create.router";
import deleteRouter from "./delete.router";

import { CreateTodoImpl, DeleteTodoImpl, InMemoryListTodos } from "@alexx666/todos";

import { providers } from "../../di";

export const createTodo = new CreateTodoImpl(providers);
export const deleteTodo = new DeleteTodoImpl(providers);
export const listTodos = new InMemoryListTodos();

const todoRouter = Router({ mergeParams: true })

todoRouter.use(listRouter(listTodos))
todoRouter.use(createRouter(createTodo))
todoRouter.use(deleteRouter(deleteTodo))

export default todoRouter;
