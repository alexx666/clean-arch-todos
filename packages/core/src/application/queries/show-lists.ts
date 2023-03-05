import { ListItem } from "../../domain";

export interface ShowListResonse {
	items: ListItem[];
	count: number;
}

export interface IShowLists {
	execute(): Promise<ShowListResonse>;
}
