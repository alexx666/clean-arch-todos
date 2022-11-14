import { CREATE_LIST, CREATE_TODO, DELETE_TODO, Mediator, LIST_CREATED, TODO_ADDED, TODO_REMOVED } from "@alexx666/todos-core";

import { CreateListHandler, CreateTodoHandler, DeleteTodoHandler, ListCreatedHandler, ListTodos, TodoAddedHandler, TodoRemovedHandler } from "./handlers";

import { config } from "./config";

const di = new Map();

// Command handlers
di.set(CREATE_LIST, new CreateListHandler(config));
di.set(CREATE_TODO, new CreateTodoHandler(config));
di.set(DELETE_TODO, new DeleteTodoHandler(config));

// Presenters
di.set(LIST_CREATED, new ListCreatedHandler());
di.set(TODO_ADDED, new TodoAddedHandler());
di.set(TODO_REMOVED, new TodoRemovedHandler());

export const client = new Mediator(di);
export const listTodos = new ListTodos(config);

