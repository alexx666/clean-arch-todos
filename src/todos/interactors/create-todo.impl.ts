import { CreateTodoRequest, CreateTodoResponse, ICreateTodo } from "../boundry/create-todo";

import { TodoGateway, Todo } from "../entities/todo";

export default class CreateTodo implements ICreateTodo {

    constructor(private gateway: TodoGateway) {}

    async execute(request: CreateTodoRequest): Promise<CreateTodoResponse> {

        const { description: requestDescription } = request;

        const requestTimestamp = new Date(); // irrelevant for the CLI

        const generatedId = Buffer.from(requestTimestamp.toISOString()).toString("base64"); // irrelevant for the CLI

        const todo = new Todo(generatedId, requestDescription, new Date());

        const { id, description, timestamp } = await this.gateway.save(todo);

        return { id, description, timestamp: timestamp.toISOString() };
    }
}