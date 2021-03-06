import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
    private readonly apiUrl = environment.apiUrl;
    constructor(private http: HttpClient) {
    }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.apiUrl + '/get-users')
            .pipe(map(response => {
                // tslint:disable-next-line:no-string-literal
                return response['user'];
            }));
    }

    deleteUser(id): Observable<any> {
        return this.http.post(this.apiUrl + '/delete-user', id);
    }

}
