import List from "../entities/list/list";

export default interface ListRepository {
	get(name: string): Promise<List>;
	create(list: List): Promise<void>;
	update(list: List): Promise<void>;
}
