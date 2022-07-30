import { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda";

import { InMemoryListTodos, ListTodosRequest } from "@alexx666/todos";

export default (listTodos: InMemoryListTodos): Handler => async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    const { pathParameters: params, path } = event;

    if (!params?.listName) throw new Error("Request has no path parameters!");

    const request: ListTodosRequest = {
        listName: String(params.listName)
    }

    const response = await listTodos.execute(request)

    return {
        statusCode: 200,
        body: JSON.stringify({
            ...response,
            links: [
                { rel: "self", href: `${path}` }
            ]
        }),
    }

}