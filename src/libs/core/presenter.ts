export default interface Presenter<O, E extends Error> {
    presentError(error: E): void;
    presentResult(output: O): void;
}