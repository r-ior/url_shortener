import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { User } from './user.model';

@Injectable()
export class UserService {
    public userEndpoint = '/api/user';

    constructor(private http: HttpClient) {}

    saveShortUrlData(userParams: User): Observable<any> {
        return this.http.post<User>(`http://localhost:8000${this.userEndpoint}/register`, userParams, { responseType: 'json' });
    }

    handleError(error: HttpErrorResponse) {
        return throwError('Something bad happened; please try again later.');
    }
}