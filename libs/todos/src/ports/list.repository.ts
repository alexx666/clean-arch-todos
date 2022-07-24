import List from "../entities/list/list";

export default interface ListRepository {
	findById(id: string): Promise<List>;
}
