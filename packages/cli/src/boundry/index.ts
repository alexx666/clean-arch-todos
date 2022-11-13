import { CREATE_LIST, CREATE_TODO, CryptoUuid, DELETE_TODO } from "@alexx666/todos-core";
import { config } from "../config";
import { CreateListImpl } from "./create-list/create-list";
import { CreateTodoImpl } from "./create-todo/create-todo";
import { DeleteTodoImpl } from "./delete-todo/delete-todo";

const handlers: Map<string, any> = new Map();

handlers.set(CREATE_LIST, new CreateListImpl(config));
handlers.set(CREATE_TODO, new CreateTodoImpl(config, new CryptoUuid()));
handlers.set(DELETE_TODO, new DeleteTodoImpl(config));

export default handlers;
