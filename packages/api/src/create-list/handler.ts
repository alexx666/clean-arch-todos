import { CreateListHandler, CREATE_LIST, Mediator, InMemoryListRepository, ListCreatedHandler, LIST_CREATED } from "@alexx666/todos-core";

import createHandler from "./controller";

const di = new Map();

const mediator = new Mediator(di);

di.set(CREATE_LIST, new CreateListHandler(mediator, new InMemoryListRepository()));
di.set(LIST_CREATED, new ListCreatedHandler()); // REVIEW: not needed if mediator was an external message bus like SNS

export const handler = createHandler(mediator);
