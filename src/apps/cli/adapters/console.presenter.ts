import Presenter from "../../../libs/core/presenter";
import { FindOutput } from "../../../libs/todos/use-cases/list-todos.io";

export default class ConsolePresenter implements Presenter<FindOutput, Error> {

    public presentError(error: Error): void {
        console.error(error.message);
    }

    public presentResult(output: FindOutput): void {
        console.log(output);
    }
}