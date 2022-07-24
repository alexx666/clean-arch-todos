import List from "../../entities/list/list";
import ListCreated from "../../events/list-created";
import EventPublisher from "../../ports/event.publisher";
import CommandConfig from "../../ports/command.config";

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

	constructor(config: CommandConfig) {
		this.publisher = config.publisher;
	}

	public async execute(request: CreateListRequest): Promise<void> {

		const { listName: name, allowDuplicates, maxTodos, allowExpired } = request;

		const newList = new List({ name, allowDuplicates, allowExpired, maxTodos });

		await this.publisher.publish(new ListCreated(newList));
	}
}
