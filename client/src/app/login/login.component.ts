import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { LoginGuard } from './login.guard';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    providers: [UserService, LoginGuard],
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    user: User = { username: '', password: '' };
    public errorText: string = '';

    constructor(private userService: UserService, protected router: Router) { }

    onSubmit(form: NgForm) {
        this.userService.getUserData(this.user).subscribe(res => {
            localStorage.setItem('authToken', res.authToken);
            this.router.navigate(['/account']);
        }, errorData => {
            if(errorData.error.code == 'bad_username') {
                form.controls['username'].setErrors({ 'invalid': true });
                this.errorText = errorData.error.message;
            }
        })
    }

    ngOnInit() {
    }

}
