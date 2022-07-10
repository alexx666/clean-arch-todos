import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ListTodosResponse } from "@alexx666/todos";

@Injectable({
	providedIn: 'root'
})
export class TodosService {

	constructor(private http: HttpClient) { }

	public getTodos(listName: string) {
		return this.http.get<ListTodosResponse>(encodeURI(`${environment.url}/lists/${listName}/todos`))
			.pipe(map((response) => response.items))
	}
}
