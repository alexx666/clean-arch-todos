import { CommandHandler } from "../../handler";
import { TodoAdded } from "./todo-added.command";

export type ITodoAddedHandler = CommandHandler<TodoAdded, void>;
