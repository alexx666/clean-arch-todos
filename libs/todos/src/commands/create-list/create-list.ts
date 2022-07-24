import List from "../../entities/list/list";
import ListCreated from "../../events/list-created";
import EventPublisher from "../../ports/event.publisher";
import UuidProvider from "../../ports/uuid";
import CommandConfig from "../command.config";

export interface CreateList {
	execute(request: CreateListRequest): Promise<void>;
}

export interface CreateListRequest {
	id?: string;
	listName: string;
	allowDuplicates: boolean;
	maxTodos: number;
}

export class CreateListImpl implements CreateList {

	private publisher: EventPublisher;

	constructor(config: CommandConfig) {
		this.publisher = config.publisher;
	}

	public async execute(request: CreateListRequest): Promise<void> {

		const { listName: name, allowDuplicates, maxTodos } = request;

		const newList = new List({ name, allowDuplicates, maxTodos });

		await this.publisher.publish(new ListCreated(newList));
	}
}
