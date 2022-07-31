import { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda";

import { ListTodos, ListTodosRequest } from "@alexx666/todos";

export default (listTodos: ListTodos): Handler => async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    console.debug("Event:", event);

    const response: Partial<APIGatewayProxyResult> = {
        statusCode: 200
    };

    try {

        const { pathParameters: params, path } = event;

        if (!params?.listId) throw new Error("Request has no path parameters!");

        const request: ListTodosRequest = {
            listName: String(params.listId)
        }

        const result = await listTodos.execute(request)

        response.body = JSON.stringify({
            ...result,
            links: [
                { rel: "self", href: `${path}` }
            ]
        })

    } catch (error) {
        console.error(error);

        response.statusCode = 500; // FIXME: better error handling
        response.body = (error as Error).message;
    }

    console.debug("Response:", response);

    return response as APIGatewayProxyResult;
}