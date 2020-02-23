import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TokenService {

    constructor() { }

    getToken() {
        return JSON.parse(localStorage.getItem('currentUser')).token;
    }

    getPayload() {
        const token = localStorage.getItem('currentUser');
        let payload;
        if (token) {
            payload = token.split('.')[1];
            payload = JSON.parse(window.atob(payload));
        }
        return payload;
    }

}
