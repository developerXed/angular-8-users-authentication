import { Todo } from './../_models/todo';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TodoService {
    private readonly apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) {
    }

    saveTodo(data): Observable<any> {
        return this.http.post(this.apiUrl + '/add-todo', data);
    }

    getTodos(id: string): Observable<Todo[]> {
        return this.http.get<Todo[]>(this.apiUrl + '/get-todos/' + id)
            .pipe(map(response => {
                // tslint:disable-next-line:no-string-literal
                return response['todos'];
            }));
    }
}
