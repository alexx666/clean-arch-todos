import { Command } from "../shared";

export interface IMediator {
	send<Output>(command: Command): Promise<Output>;
}
