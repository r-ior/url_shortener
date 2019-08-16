import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { User } from '../user/user.model';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  providers: [UserService],
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user: User = { fullname: '', username: '', email: '', password: ''};

  constructor(private userService: UserService) { }

  onSubmit(form: NgForm) {
    // let userData = { fullname: form.value.fullname, username: form.value.username, email: form.value.email, password: form.value.password }

    this.userService.saveShortUrlData(this.user).subscribe(res => {
      console.log(this.user);
      let data = JSON.parse(res);
      
      if(data.authToken) {
        console.log('is ok!');
      }
    })
  }

  ngOnInit() {
  }

}
