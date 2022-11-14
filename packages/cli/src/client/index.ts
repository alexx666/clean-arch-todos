import { CREATE_LIST, CREATE_TODO, DELETE_TODO, Mediator } from "@alexx666/todos-core";

import { CreateListHandler, CreateTodoHandler, DeleteTodoHandler, ListTodos } from "./handlers";

import { config } from "./config";

const di = new Map();

// Command handlers
di.set(CREATE_LIST, new CreateListHandler(config));
di.set(CREATE_TODO, new CreateTodoHandler(config));
di.set(DELETE_TODO, new DeleteTodoHandler(config));

export const client = new Mediator(di);
export const listTodos = new ListTodos(config);

