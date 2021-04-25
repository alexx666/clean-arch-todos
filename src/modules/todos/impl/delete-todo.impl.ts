import { WritableGateway } from "../../shared/entity.gateway";
import { DeleteTodo, DeleteTodoRequest, DeleteTodoResponse } from "../boundry/delete-todo";
import Todo from "../entities/todo";

export default class DeleteTodoImpl implements DeleteTodo {

    constructor(private gateway: WritableGateway<Todo>) {}

    public async execute(request: DeleteTodoRequest): Promise<DeleteTodoResponse> {
        const todo = await this.gateway.delete(request.listName, request.id);

				const item = {
					id: todo.id,
					description: todo.description,
					start: todo.start.toISOString(),
					end: todo.end.toISOString()
				}

        return { item };
    }
}
