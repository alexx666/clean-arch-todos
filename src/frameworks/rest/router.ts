import RESTController from "../../adapters/controllers/rest.controller";
import Repository from "../../adapters/gateways/repository";
import Response from "../../adapters/presenters/response";
import DoSomething from "../../use-cases/do-something/interactor";

const repository = new Repository()

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