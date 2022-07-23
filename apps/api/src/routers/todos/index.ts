import { Router } from "express";

import listRouter from "./list.router";
import createRouter from "./create.router";
import deleteRouter from "./delete.router";

import { CreateTodoImpl, DeleteTodoImpl, ListTodosImpl } from "@alexx666/todos";

import { providers, todoDao } from "../../di";

export const createTodo = new CreateTodoImpl(providers);
export const deleteTodo = new DeleteTodoImpl(providers);
export const listTodos = new ListTodosImpl(todoDao);

const todoRouter = Router({ mergeParams: true })

todoRouter.use(listRouter(listTodos))
todoRouter.use(createRouter(createTodo))
todoRouter.use(deleteRouter(deleteTodo))

export default todoRouter;
