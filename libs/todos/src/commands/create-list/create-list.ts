import List from "../../entities/list/list";
import EventPublisher from "../../ports/event.publisher";
import ListRepository from "../../ports/list.repository";
import UuidProvider from "../../ports/uuid";
import Name from "../../value-objects/list-name";
import CommandConfig from "../command.config";

export interface CreateList {
	execute(request: CreateListRequest): Promise<void>;
}

export interface CreateListRequest {
	listName: string;
}

export const LIST_CREATED = "ListCreated";

export type ListCreatedEvent = CreateListRequest;

export class CreateListImpl implements CreateList {

	private repository: ListRepository;
	private uuidProvider: UuidProvider;
	private publisher: EventPublisher;

	constructor(config: CommandConfig) {
		this.publisher = config.publisher;
		this.uuidProvider = config.uuidProvider;
		this.repository = config.repository;
	}

	public async execute(request: CreateListRequest): Promise<void> {

		const { listName } = request;

		const newList = new List(Name.create(listName));

		await this.repository.create(newList);

		await this.publisher.publish({
			id: this.uuidProvider.generate(),
			type: LIST_CREATED,
			details: request,
		});
	}
}
