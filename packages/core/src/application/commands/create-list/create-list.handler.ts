import { CommandHandler } from "../../handler";

import { CreateList } from "./create-list.command";

export interface CreateListRespose {
	id: string;
}

export type ICreateListHandler = CommandHandler<CreateList, CreateListRespose>;
