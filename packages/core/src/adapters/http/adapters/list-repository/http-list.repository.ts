import { List } from "../../../../entities";
import { ListRepository } from "../../../../ports";

export class HttpListRepository implements ListRepository {

	public findByName(): Promise<List | undefined> {
		return Promise.resolve(undefined);
	}

	public save(): Promise<void> {
		return Promise.resolve();
	}

}
