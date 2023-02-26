import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map } from "rxjs";
import { environment } from "../../../environments/environment";
import {
	CreateListParameters,
	CreateTodoParameters,
	DeleteTodoParameters,
	ListTodosRequest,
	ListTodosResponse,
} from "@todos/core";
import { v4 } from "uuid";

@Injectable({
	providedIn: "root",
})
export class TodosService {
	constructor(private http: HttpClient) { }

	public getTodos(request: ListTodosRequest) {
		const url = encodeURI(`${environment.url}/lists/${request.listName}/todos`);

		const options = {
			headers: {
				"X-Request-Id": v4(),
			},
		};

		return this.http
			.get<ListTodosResponse>(url, options)
			.pipe(map((response) => response.items))
			.pipe(
				catchError((response) => {
					throw new Error(response.error.error);
				})
			);
	}

	public createList(request: CreateListParameters) {
		const url = encodeURI(`${environment.url}/lists`);

		const body = { listName: request.name };

		const options = {
			headers: {
				"X-Request-Id": v4(),
			},
		};

		return this.http.post(url, body, options).pipe(
			catchError((response) => {
				throw new Error(response.error.error);
			})
		);
	}

	public createTodo(request: CreateTodoParameters) {
		const url = encodeURI(`${environment.url}/lists/${request.listName}/todos`);

		const body = {
			description: request.description,
			start: request.start,
			end: request.end,
		};

		const options = {
			headers: {
				"X-Request-Id": v4(),
			},
		};

		return this.http.post(url, body, options).pipe(
			catchError((response) => {
				throw new Error(response.error.error);
			})
		);
	}

	// TODO: handle returned item for undo functionality
	public deleteTodo(request: DeleteTodoParameters) {
		const url = encodeURI(
			`${environment.url}/lists/${request.listName}/todos/${request.id}`
		);

		const options = {
			headers: {
				"X-Request-Id": v4(),
			},
		};

		return this.http.delete<void>(url, options).pipe(
			catchError((response) => {
				throw new Error(JSON.parse(response).error);
			})
		);
	}
}
