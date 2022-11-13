import { config, CreateListHandler, CreateTodoHandler, CREATE_LIST, CREATE_TODO, CryptoUuid, DeleteTodoHandler, DELETE_TODO, HttpListRepository, HttpMediator, InMemoryMediator } from "@alexx666/todos-core";

// just a mock
const httpListRepository = new HttpListRepository();
const uuids = new CryptoUuid();
const http = new HttpMediator(config);

const di = new Map();

di.set(CREATE_LIST, new CreateListHandler(http, httpListRepository))
di.set(CREATE_TODO, new CreateTodoHandler(httpListRepository, uuids, http))
di.set(DELETE_TODO, new DeleteTodoHandler(http, httpListRepository))

export const client = new InMemoryMediator(di);

