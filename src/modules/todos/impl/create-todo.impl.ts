import { Gateway } from "../../shared/entity.gateway";
import UUDIGenerator from "../../shared/uuid-generator";
import { CreateTodoRequest, CreateTodoResponse, CreateTodo } from "../boundry/create-todo";
import List from "../entities/list";
import Todo from "../entities/todo";

export default class CreateTodoImpl implements CreateTodo {

    constructor(private repository: Gateway<Todo>, private uuidGenerator: UUDIGenerator) {}

    async execute(request: CreateTodoRequest): Promise<CreateTodoResponse> {

        const { description, start, end, listName } = request;

				const listSize = await this.repository.count({ listName });

				const list = new List(listName, listSize);

        const todo = new Todo(this.uuidGenerator.generate(), list.name, description, new Date(start), new Date(end));

				list.add(todo);

        const { id } = await this.repository.save(todo);

        return { id };
    }
}
