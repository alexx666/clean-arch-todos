import { Events, InMemoryListTodos } from "@alexx666/todos";

import createHandler from "./controller";

// TODO: provide AWS implementation
const eventStore: Events<any> = new Events();

const useCase = new InMemoryListTodos(eventStore);

export const handler = createHandler(useCase)