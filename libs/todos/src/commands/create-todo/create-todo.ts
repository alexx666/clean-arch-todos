import { Todo } from "../../entities";
import { TodoAdded } from "../../events";
import { EventPublisher, ListRepository, UuidGenerator, Providers } from "../../ports";

export interface CreateTodo {
	execute(request: CreateTodoRequest): Promise<CreateTodoResponse>;
}

export interface CreateTodoRequest {
	id?: string;
	description: string;
	start: string;
	end: string;
	listName: string;
}

export interface CreateTodoResponse {
	id: string;
}

export class CreateTodoImpl implements CreateTodo {

	private repository: ListRepository;
	private uuidProvider: UuidGenerator;
	private publisher: EventPublisher;

	constructor(config: Providers) {
		this.publisher = config.publisher;
		this.uuidProvider = config.uuid;
		this.repository = config.repository;
	}

	async execute(request: CreateTodoRequest): Promise<CreateTodoResponse> {

		const { id: uuid, description, start, end, listName } = request;

		const startDate = new Date(start);
		const endDate = new Date(end);
		const id = uuid ?? this.uuidProvider.generate();

		const todo = new Todo({ id, description, startDate, endDate, listName });

		const list = await this.repository.findByName(listName);

		if (!list) throw new Error("[CreateTodo] Error: List does not exist!");

		list.add(todo);

		await this.publisher.publish(new TodoAdded(todo));

		return { id };
	}
}
