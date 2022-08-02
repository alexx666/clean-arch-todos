import { List } from "../entities";

export default interface ListRepository {
	findByName(name: string): Promise<List | undefined>;
}
