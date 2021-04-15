import { WritableGateway } from "../../shared/entity.gateway";
import UUDIGenerator from "../../shared/uuid-generator";
import { CreateTodoRequest, CreateTodoResponse, CreateTodo } from "../boundry/create-todo";
import { Todo } from "../entities/todo";

export default class CreateTodoImpl implements CreateTodo {

    constructor(private gateway: WritableGateway<Todo>, private uuidGenerator: UUDIGenerator) {}

    async execute(request: CreateTodoRequest): Promise<CreateTodoResponse> {

        const {
            description: requestDescription,
            due: requestDue,
        } = request;

        const generatedId = this.uuidGenerator.generate()

        const todo = new Todo(generatedId, requestDescription, new Date(requestDue));

        const { id, description, due } = await this.gateway.save(todo);

        return { id, description, due: due.toISOString() };
    }
}
