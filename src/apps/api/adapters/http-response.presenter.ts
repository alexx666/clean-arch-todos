import Presenter from "../../../libs/todos/use-cases/presenter";

export default class HTTPResponsePresenter implements Presenter {

    constructor(private response: any) {}

    present(data: any) {
        return this.response.json({ data })
    }

}