import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CreateListRequest, CreateTodoRequest, DeleteTodoRequest, DeleteTodoResponse, ListTodosRequest, ListTodosResponse } from "@alexx666/todos";

@Injectable({
	providedIn: 'root'
})
export class TodosService {

	constructor(private http: HttpClient) { }

	public getTodos(request: ListTodosRequest) {
		const url = encodeURI(`${environment.url}/lists/${request.listName}/todos`);

		return this.http.get<ListTodosResponse>(url).pipe(map((response) => response.items)).pipe(
			catchError((response) => { throw new Error(response.error.error) })
		)
	}

	public createList(request: CreateListRequest) {
		const url = encodeURI(`${environment.url}/lists`);

		const body = { listName: request.listName };

		return this.http.post(url, body).pipe(
			catchError((response) => { throw new Error(response.error.error) })
		);
	}

	public createTodo(request: CreateTodoRequest) {

		const url = encodeURI(`${environment.url}/lists/${request.listName}/todos`);

		const body = {
			description: request.description,
			start: request.start,
			end: request.end
		}

		return this.http.post(url, body).pipe(
			catchError((response) => { throw new Error(response.error.error) })
		);
	}

	// TODO: handle returned item for undo functionality
	public deleteTodo(request: DeleteTodoRequest) {
		const url = encodeURI(`${environment.url}/lists/${request.listName}/todos/${request.id}`);

		return this.http.delete<DeleteTodoResponse>(url).pipe(
			catchError((response) => { throw new Error(JSON.parse(response).error) })
		);
	}
}
