import { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda";

import { CreateTodo, CreateTodoRequest } from "@alexx666/todos";

export default (createTodo: CreateTodo): Handler => async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    console.debug("Event:", event);

    const response: Partial<APIGatewayProxyResult> = {
        statusCode: 200,
    };

    try {
        const { body, pathParameters: params } = event;

        if (!body) throw new Error("Request has no body!");
        if (!params?.listId) throw new Error("Request has no path parameters!");

        const todoParams = JSON.parse(body);

        const request: CreateTodoRequest = { ...todoParams, listName: decodeURI(params.listId) };

        const result = await createTodo.execute(request);

        response.body = JSON.stringify(result);
    } catch (error) {
        console.error(error);

        response.statusCode = 500; // FIXME: better error handling
        response.body = (error as Error).message;
    }

    console.debug("Response:", response)

    return response as APIGatewayProxyResult;

}
