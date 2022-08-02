import { List } from "../../entities/";
import { ListCreated } from "../../events";
import { EventPublisher, Providers } from "../../ports";

export interface CreateList {
	execute(request: CreateListRequest): Promise<void>;
}

export interface CreateListRequest {
	listName: string;
	allowDuplicates: boolean;
	allowExpired: boolean;
	maxTodos: number;
}

export class CreateListImpl implements CreateList {

	private publisher: EventPublisher;

	constructor(config: Providers) {
		this.publisher = config.publisher;
	}

	public async execute(request: CreateListRequest): Promise<void> {

		const { listName: name, allowDuplicates, maxTodos, allowExpired } = request;

		const newList = new List({ name, allowDuplicates, allowExpired, maxTodos });

		await this.publisher.publish(new ListCreated(newList));
	}
}
