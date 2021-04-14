// Frameworks
import { Router, NextFunction, Request, Response } from "express";
import { json } from "body-parser";

// Gatway Implementations
import InMemoryTodoGateway from "../../providers/todo-in-memory.gateway";

// Use Case Implementations
import CreateTodoImpl from "../../modules/todos/impl/create-todo.impl";
import DeleteTodoImpl from "../../modules/todos/impl/delete-todo.impl";
import ListTodosImpl from "../../modules/todos/impl/list-todos.impl";

// Request/Response models
import { CreateTodoRequest } from "../../modules/todos/boundry/create-todo";
import { ListTodosRequest } from "../../modules/todos/boundry/list-todos";
import { DeleteTodoRequest } from "../../modules/todos/boundry/delete-todo";

const repository = new InMemoryTodoGateway()

const listTodos = new ListTodosImpl(repository);
const createTodo = new CreateTodoImpl(repository);
const deleteTodo = new DeleteTodoImpl(repository);

const todoRouter = Router()

todoRouter.get("/", async (req, res, next) => {
    try {
        const request: ListTodosRequest = { limit: Number(req.query.limit) || 20 }
        const response = await listTodos.execute(request)

        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
})

todoRouter.post("/", json(), async (req, res, next) => {
    try {
        const request = req.body as CreateTodoRequest;
        const response = await createTodo.execute(request);

        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
})

todoRouter.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const request: DeleteTodoRequest = { id: req.params.id };
        const response = await deleteTodo.execute(request);

        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
})

export default todoRouter;
