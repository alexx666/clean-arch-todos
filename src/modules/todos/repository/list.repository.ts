import List from "../entities/list/list";

export interface ListRepository {
	get(name: string): Promise<List>;
	save(list: List): Promise<void>;
}
