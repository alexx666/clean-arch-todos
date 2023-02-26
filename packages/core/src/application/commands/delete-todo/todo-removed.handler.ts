import { CommandHandler } from "../../handler";

import { TodoRemoved } from "./todo-removed.command";

export type ITodoRemovedHandler = CommandHandler<TodoRemoved, void>;
