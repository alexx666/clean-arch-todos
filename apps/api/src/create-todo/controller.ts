import { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda";

import { CreateTodo, CreateTodoRequest } from "@alexx666/todos";

export default (createTodo: CreateTodo): Handler => async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    const { body, pathParameters: params } = event;

    if (!body) throw new Error("Request has no body!");
    if (!params?.listName) throw new Error("Request has no path parameters!");

    const todoParams = JSON.parse(body);

    const request: CreateTodoRequest = { ...todoParams, listName: decodeURI(params.listName) };

    const response = await createTodo.execute(request);

    return {
        statusCode: 200,
        body: JSON.stringify(response),
    }

}
