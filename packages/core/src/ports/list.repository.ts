import { List } from "../domain";

/**
 * Data access object for {@link List} domain entities.
 */
export default interface ListRepository {
	/**
	 * Retreives a {@link List} given its name
	 * @param name string value representing the {@link List} name
	 */
	findByName(name: string): Promise<List | undefined>;

	/**
	 * Persists list changes into the repository
	 * @param list {@link List} object to be saved
	 */
	save(list: List): Promise<void>;
}
