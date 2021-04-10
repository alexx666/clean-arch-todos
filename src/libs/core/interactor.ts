import Input from "./input";
import Result from "./result";
import Output from "./output";
import Presenter from "./presenter";

// Dependency of Controllers, implemented by Interactors
export default interface Interactor {
    execute(input: Input): Result<Output>;
    execute(input: Input, callback?: (error?: Error, output?: Output) => void): void;

    subscribe(presenter: Presenter<Output,Error>): void;
}