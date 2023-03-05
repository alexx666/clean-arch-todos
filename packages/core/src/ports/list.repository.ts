import { List } from "../domain";

/**
 * Data access object for {@link List} domain entities.
 */
export interface ListRepository {
	findById(name: string): Promise<List | undefined>;
}
