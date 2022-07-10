import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TodoItem } from '../state/todos.state';

interface Link {
	rel: string,
	href: string
}

interface TodosResponse {
	items: TodoItem[],
	count: number,
	listName: string,
	links: Link[]
}

@Injectable({
	providedIn: 'root'
})
export class TodosService {

	constructor(private http: HttpClient) { }

	public getTodos(listName: string) {
		return this.http.get<TodosResponse>(encodeURI(`${environment.url}/lists/${listName}/todos`))
			.pipe(map((response) => response.items))
	}
}
