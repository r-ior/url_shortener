import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { Url } from './url.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class UrlService {
    public urlEndpoint = 'api/url';

    constructor(private http: HttpClient) {}

    getShortUrlData(short: string): Observable<Url> {
        return this.http.get<Url>(`${environment.apiUrl}${this.urlEndpoint}/${short}`, { responseType: 'json' });
    }

    saveShortUrlData(urlParams: Url): Observable<any> {
        return this.http.post<Url>(`${environment.apiUrl}${this.urlEndpoint}`, urlParams, { responseType: 'json' });
    }

    getShortUrlDataByUser(userId: number): Observable<any> {
        return this.http.get<Url[]>(`${environment.apiUrl}${this.urlEndpoint}/${userId}`, { responseType: 'json' });
    }

    copyToClipboard(element) {
        let range = document.createRange();
        range.selectNodeContents(element);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        document.execCommand("copy");
    }

    handleError(error: HttpErrorResponse) {
        return throwError('Something bad happened; please try again later.');
    }
}