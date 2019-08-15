import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { Url } from './url.model';

@Injectable()
export class UrlService {
    public urlEndpoint = '/api/url';

    constructor(private http: HttpClient) {}

    getShortUrlData(short: string): Observable<Url> {
        return this.http.get<Url>(`http://localhost:8000${this.urlEndpoint}/${short}`, { responseType: 'json' });
    }

    saveShortUrlData(urlParams: Url): Observable<any> {
        return this.http.post<Url>(`http://localhost:8000${this.urlEndpoint}`, urlParams, { responseType: 'json' });
    }

    handleError(error: HttpErrorResponse) {
        return throwError('Something bad happened; please try again later.');
    }
}