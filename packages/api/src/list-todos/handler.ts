import { InMemoryListTodos } from "@alexx666/todos-core";

import createHandler from "./controller";

export const handler = createHandler(new InMemoryListTodos());
