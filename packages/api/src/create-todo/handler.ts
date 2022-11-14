import { CreateTodoHandler, CREATE_TODO, CryptoUuid, Mediator, InMemoryListRepository, TodoAddedHandler, TODO_ADDED } from "@alexx666/todos-core";

import createHandler from "./controller";

const di = new Map();

const mediator = new Mediator(di);

di.set(CREATE_TODO, new CreateTodoHandler(new InMemoryListRepository(), new CryptoUuid(), mediator));
di.set(TODO_ADDED, new TodoAddedHandler());

export const handler = createHandler(mediator);
