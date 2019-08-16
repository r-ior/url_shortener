import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { RegisterGuard } from './register.guard';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  providers: [UserService, RegisterGuard],
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user: User = { fullname: '', username: '', email: '', password: ''};

  constructor(private userService: UserService) { }

  onSubmit(form: NgForm) {
    this.userService.saveUserData(this.user);
  }

  ngOnInit() {
  }

}
