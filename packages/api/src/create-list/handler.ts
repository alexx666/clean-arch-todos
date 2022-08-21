import {
	CreateListImpl,
	CryptoUuid,
	DynamoEventPublisher,
	DynamoListRepository,
	Providers,
} from "@alexx666/todos";

import createHandler from "./controller";

const providers: Providers = {
	repository: new DynamoListRepository(),
	uuid: new CryptoUuid(),
	publisher: new DynamoEventPublisher(),
};

const useCase = new CreateListImpl(providers);

export const handler = createHandler(useCase);
