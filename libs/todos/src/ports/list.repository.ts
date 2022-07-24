import List from "../entities/list/list";

export default interface ListRepository {
	findByName(name: string): Promise<List>;
	findById(id: string): Promise<List>;
}
