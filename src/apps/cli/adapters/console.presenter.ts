import Presenter from "../../../libs/todos/use-cases/presenter";

export default class ConsolePresenter implements Presenter {
    present(data: any): void {
        console.log("RESULT:", data)
    }
}