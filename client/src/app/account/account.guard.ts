import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router, CanActivate } from '@angular/router';
import { UserService } from '../user/user.service';

@Injectable()
export class AccountGuard implements CanActivate {
    constructor(public userService: UserService, protected router: Router) {}

    canActivate(): Observable<boolean> {
        let authToken = localStorage.getItem('authToken');
        return this.userService.getUserDataByToken(authToken)
            .pipe(
                map(resp => { return true; }),
                catchError(error => this.router.navigate(['/login']))
            )
    }
}