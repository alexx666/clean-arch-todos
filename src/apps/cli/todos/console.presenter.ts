import Presenter from "../../../core/presenter";

export default class ConsolePresenter implements Presenter {

    public present<T>(data: T): void {
        console.info("Results:", data);
    }
}