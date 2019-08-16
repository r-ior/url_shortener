import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { User } from '../user/user.model';
import { UserService } from '../user/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    providers: [UserService],
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    user: User = { username: '', password: '' };

    constructor(private userService: UserService) { }

    onSubmit(form: NgForm) {
        this.userService.getUserData(this.user).subscribe(res => {
            localStorage.setItem('authToken', res.authToken);
        })
    }

    ngOnInit() {
    }

}
