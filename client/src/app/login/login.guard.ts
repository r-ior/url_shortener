import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router, CanActivate } from '@angular/router';
import { UserService } from '../user/user.service';

@Injectable()
export class LoginGuard implements CanActivate {
    constructor(public userService: UserService, protected router: Router) {}

    canActivate(): Observable<boolean> {
        let authToken = localStorage.getItem('authToken');

        if(authToken == null) return of(true);

        return this.userService.getUserDataByToken(authToken)
            .pipe(
                map(resp => { 
                    this.router.navigate(['/account']); 
                    return false; 
                }),
                catchError(error => of(true))
            )
    }
}