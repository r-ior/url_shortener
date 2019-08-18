import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  isAuthenticated() {
    return this.userService.isAuthenticated();
  }

  logOut(event):void {
    event.preventDefault();
    localStorage.removeItem('authToken');

    this.router.navigate(['/login']);
    // window.location.reload();
  }

  ngOnInit() {
  }

}
