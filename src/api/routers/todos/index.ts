import { Router } from "express";

import InMemoryTodoGateway from "../../../modules/todos/repository/in-memory/in-memory.repository";

import listRouter from "./list.router";
import createRouter from "./create.router";
import deleteRouter from "./delete.router";

import { CreateTodoImpl } from "../../../modules/todos/boundry/create-todo/create-todo";
import { DeleteTodoImpl } from "../../../modules/todos/boundry/delete-todo/delete-todo";
import { ListTodosImpl } from "../../../modules/todos/boundry/list-todos/list-todos";

const repository = new InMemoryTodoGateway()

export const createTodo = new CreateTodoImpl(repository);
export const deleteTodo = new DeleteTodoImpl(repository);
export const listTodos = new ListTodosImpl(repository);

const todoRouter = Router({ mergeParams: true })

todoRouter.use(listRouter(listTodos))
todoRouter.use(createRouter(createTodo))
todoRouter.use(deleteRouter(deleteTodo))

export default todoRouter;
