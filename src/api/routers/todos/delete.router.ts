import { Router, NextFunction, Request, Response } from "express";

import { DeleteTodoRequest } from "../../../modules/todos/boundry/delete-todo";

import { deleteTodo } from "./loader";

const deleteRouter = Router()

deleteRouter.delete("/todos/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const request: DeleteTodoRequest = { id: req.params.id };
        const response = await deleteTodo.execute(request);

        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
})

export default deleteRouter;
