import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { User } from './user.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class UserService {
    public userEndpoint = 'api/user';

    constructor(private http: HttpClient, protected router: Router) {}

    saveUserData(userParams: User): Observable<any> {
        return this.http.post<User>(`${environment.apiUrl}${this.userEndpoint}/register`, userParams, { responseType: 'json' });
    }

    getUserData(userCredentials: User): Observable<any> {
        return this.http.post<User>(`${environment.apiUrl}${this.userEndpoint}/auth`, userCredentials, { responseType: 'json' });
    }

    getUserDataByToken(authToken: string): Observable<any> {
        return this.http.get<User>(`${environment.apiUrl}${this.userEndpoint}/${authToken}`, { responseType: 'json' });
    }

    isAuthenticated() {
        if(localStorage.getItem('authToken')) {
            let authToken = localStorage.getItem('authToken');

            return this.getUserDataByToken(authToken)
            .pipe(
                map(resp => { return true; }),
                catchError(error => of(false))
            )
        }

        return false;
    }
}