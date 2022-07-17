import { HttpClientTodoGateway } from "@alexx666/todos";
import config from "./config";

export const todoGateway = new HttpClientTodoGateway(config);
