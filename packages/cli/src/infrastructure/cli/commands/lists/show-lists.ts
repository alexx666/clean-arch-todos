import { Command } from "commander";
import { randomUUID as generate } from "crypto";

import { ShowLists } from "../../../../application";
import { ShowListsController } from "../../../../controllers";
import { defaultConfig, HTTPClient } from "../../../http";

export default new Command("list")
	.alias("ls")
	.description("Lists all available todo lists")
	.action(() => {
		const client = new HTTPClient(defaultConfig);
		const interactor = new ShowLists(client, { generate });
		const controller = new ShowListsController(interactor);

		return controller.handle();
	})
