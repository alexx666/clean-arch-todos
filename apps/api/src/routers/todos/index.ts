import { Router } from "express";

import listRouter from "./list.router";
import createRouter from "./create.router";
import deleteRouter from "./delete.router";

import { CreateTodoImpl, DeleteTodoImpl, ListTodosImpl } from "@alexx666/todos";

import { todoGateway } from "../../db";

export const createTodo = new CreateTodoImpl(todoGateway);
export const deleteTodo = new DeleteTodoImpl(todoGateway);
export const listTodos = new ListTodosImpl(todoGateway);

const todoRouter = Router({ mergeParams: true })

todoRouter.use(listRouter(listTodos))
todoRouter.use(createRouter(createTodo))
todoRouter.use(deleteRouter(deleteTodo))

export default todoRouter;
