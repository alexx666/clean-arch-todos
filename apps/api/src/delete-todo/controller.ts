import { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda";

import { DeleteTodo, DeleteTodoRequest } from "@alexx666/todos";

export default (deleteTodo: DeleteTodo): Handler => async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    const { pathParameters: params } = event;

    if (!params?.listName || !params?.todoId) throw new Error("Request has no path parameters!");

    const request: DeleteTodoRequest = { listName: params.listName, id: params.todoId };

    await deleteTodo.execute(request);

    return {
        statusCode: 201,
        body: '',
    }
}