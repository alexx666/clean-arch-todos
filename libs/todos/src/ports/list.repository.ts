import { List } from "../entities";

export default interface ListRepository {
	findById(id: string): Promise<List>;
}
