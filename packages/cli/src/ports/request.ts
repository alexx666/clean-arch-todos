export interface Request {
	send<O>(): Promise<O>;
}
