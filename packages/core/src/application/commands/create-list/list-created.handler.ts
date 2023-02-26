import { CommandHandler } from "../../handler";

import { ListCreated } from "./list-created.command";

export type IListCreatedHandler = CommandHandler<ListCreated, void>;
