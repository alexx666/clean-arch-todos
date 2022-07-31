import { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda";

import { CreateList, CreateListRequest } from "@alexx666/todos";

export default (createList: CreateList): Handler => async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    console.debug("Event:", event);

    const response: APIGatewayProxyResult = {
        statusCode: 201,
        body: '',
        headers: {
            "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET,DELETE,PUT",
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
        },
    };

    try {
        if (!event.body) throw new Error("Request has no body!");

        const body = JSON.parse(event.body);

        const request: CreateListRequest = {
            listName: body.name,
            maxTodos: body.maxTodos ?? 10,
            allowDuplicates: body.allowDuplicates ?? false,
            allowExpired: body.allowExpired ?? true,
        };

        await createList.execute(request);
    } catch (error) {
        console.error(error);

        response.statusCode = 500; // FIXME: better error handling
        response.body = JSON.stringify({
            error: (error as Error).message,
        });
    }

    console.debug("Response:", response)

    return response;

}