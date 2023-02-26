import { Command } from "../application";

export interface IMediator {
	send<Output>(command: Command): Promise<Output | void>;
}
