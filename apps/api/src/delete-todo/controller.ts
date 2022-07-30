import { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda";

import { DeleteTodo, DeleteTodoRequest } from "@alexx666/todos";

export default (deleteTodo: DeleteTodo): Handler => async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    console.debug("Event:", event);

    const response: Partial<APIGatewayProxyResult> = {
        statusCode: 201,
        body: '',
    };

    try {
        const { pathParameters: params } = event;

        if (!params?.listId || !params?.todoId) throw new Error("Request has no path parameters!");

        const request: DeleteTodoRequest = { listName: params.listId, id: params.todoId };

        await deleteTodo.execute(request);
    } catch (error) {
        response.statusCode = 500; // FIXME: better error handling
        response.body = (error as Error).message;
    }

    console.debug("Response:", response);

    return response as APIGatewayProxyResult;
}