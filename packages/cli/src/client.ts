import { config, CryptoUuid, HttpListRepository, HttpMediator } from "@alexx666/todos-core";

export const client = new HttpMediator(config, new HttpListRepository(), new CryptoUuid());
