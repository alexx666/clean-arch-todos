import { WritableGateway } from "../../core/entity.gateway";
import { CreateTodoRequest, CreateTodoResponse, ICreateTodo } from "../boundry/create-todo";
import { Todo } from "../entities/todo";

export default class CreateTodo implements ICreateTodo {

    constructor(private gateway: WritableGateway<Todo>) {}

    async execute(request: CreateTodoRequest): Promise<CreateTodoResponse> {

        const {
            id: requestId,
            description: requestDescription,
            timestamp: requiestTimestamp
        } = request;

        const generatedTimestamp = requiestTimestamp ? new Date(requiestTimestamp) : new Date();

        const generatedId = requestId || Buffer.from(generatedTimestamp.toISOString()).toString("base64");

        const todo = new Todo(generatedId, requestDescription, generatedTimestamp);

        const { id, description, timestamp } = await this.gateway.save(todo);

        return { id, description, timestamp: timestamp.toISOString() };
    }
}