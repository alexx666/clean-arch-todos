// Dependency of Controllers, implemented by Interactors
export default interface InputPort {
    list(params: any): void
}