import List from "../../entities/list/list";
import EventPublisher from "../../ports/event.publisher";
import UuidProvider from "../../ports/uuid";
import CommandConfig from "../command.config";

export interface CreateList {
	execute(request: CreateListRequest): Promise<CreateListResponse>;
}

export interface CreateListRequest {
	id?: string;
	listName: string;
	allowDuplicates: boolean;
	maxTodos: number;
}

export interface CreateListResponse {
	id: string;
}

export const LIST_CREATED = "ListCreated";

export type ListCreatedEvent = CreateListRequest;

export class CreateListImpl implements CreateList {

	private uuidProvider: UuidProvider;
	private publisher: EventPublisher;

	constructor(config: CommandConfig) {
		this.publisher = config.publisher;
		this.uuidProvider = config.uuidProvider;
	}

	public async execute(request: CreateListRequest): Promise<CreateListResponse> {

		const { id: uuid, listName: name, allowDuplicates, maxTodos } = request;

		const id = uuid ?? this.uuidProvider.generate();

		const newList = new List({ id, name, allowDuplicates, maxTodos });

		await this.publisher.publish({
			id,
			type: LIST_CREATED,
			details: newList,
			timestamp: Date.now(),
		});

		return { id };
	}
}
