import MockRepository from "../../../libs/mock/mock.repository";
import DoSomething from "../../../libs/do/interactor";
import Response from "../adapters/response.presenter";
import RESTController from "../adapters/rest.controller";

const repository = new MockRepository()

export default async function doSomethingHandler(req: any, res: any, next: any) {
    const response = new Response(res)
    const useCase = new DoSomething(response, repository);
    const controller = new RESTController(useCase);

    try {
        return await controller.doSomething(req)
    } catch (error) {
        next(error)
    }
}