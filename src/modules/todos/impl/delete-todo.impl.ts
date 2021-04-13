import { WritableGateway } from "../../shared/entity.gateway";
import { DeleteTodo, DeleteTodoRequest, DeleteTodoResponse } from "../boundry/delete-todo";
import { Todo } from "../entities/todo";

export default class DeleteTodoImpl implements DeleteTodo {

    constructor(private gateway: WritableGateway<Todo>) {}

    public async execute(request: DeleteTodoRequest): Promise<DeleteTodoResponse> {
        const item = await this.gateway.delete(request.id);

        return { item };
    }
}