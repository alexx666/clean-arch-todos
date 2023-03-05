import { ListDetails, DeleteTodoParameters, Commands, Command } from "../application";
import { List, ListParameters, Todo, TodoParameters } from "../domain";

export class ListProjectionMapper {
	public static buildFromStream(events: Commands | Command[]): List {
		const listParams: Partial<ListParameters> = {};

		for (const { name: type, params: details } of events) {
			switch (true) {
				case type === "ListCreated":
					listParams.id = (details as ListDetails).id;
					listParams.name = (details as ListDetails).name;
					listParams.allowDuplicates = (details as ListDetails).allowDuplicates;
					listParams.allowExpired = (details as ListDetails).allowExpired;
					listParams.maxTodos = (details as ListDetails).maxTodos;
					listParams.todos = [];

					break;

				case type === "TodoAdded":
					listParams.todos?.push(
						new Todo({
							...(details as TodoParameters),
							startDate: new Date((details as TodoParameters).startDate),
							endDate: new Date((details as TodoParameters).endDate),
						})
					);

					break;

				case type === "TodoRemoved":
					listParams.todos = listParams.todos?.filter(
						(todo) => todo.id !== (details as DeleteTodoParameters).id
					);

					break;

				default:
					throw new Error(
						"[List] Error: Unable to build object state from event stream!"
					);
			}
		}

		return new List(listParams as ListParameters);
	}
}
