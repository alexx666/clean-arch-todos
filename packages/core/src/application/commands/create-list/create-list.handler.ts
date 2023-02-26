import { CommandHandler } from "../../handler";

import { CreateList } from "./create-list.command";

export type ICreateListHandler = CommandHandler<CreateList, Promise<void>>;
