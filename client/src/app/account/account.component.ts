import { Component, OnInit } from '@angular/core';
import { AccountGuard } from './account.guard';
import { UserService } from '../user/user.service';
import { UrlService } from '../url/url.service';
import { Url } from '../url/url.model';
import { User } from '../user/user.model';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  providers: [AccountGuard, UrlService, UserService],
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  urls: Url[];
  user: User;
  public origin = window.location.origin;

  constructor(private urlService: UrlService, private userService: UserService) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    let token = localStorage.getItem('authToken') ? localStorage.getItem('authToken') : null;
    this.userService.getUserDataByToken(token).subscribe(userData => {
      this.user = JSON.parse(userData);
      
      this.getUrls();
    });
  }

  getUrls() {
    this.urlService.getShortUrlDataByUser(this.user.id).subscribe(res => {
      res = JSON.parse(res);
      for (let i = 0; i < res.length; i++) {
        res[i].shortUrl = `${origin}/${res[i].shortUrl}`;
      }

      this.urls = res;
      
    })
  }

}
