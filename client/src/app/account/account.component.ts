import { Component, OnInit } from '@angular/core';
import { AccountGuard } from './account.guard';
import { UserService } from '../user/user.service';
import { UrlService } from '../url/url.service';
import { Url } from '../url/url.model';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  providers: [AccountGuard, UrlService, UserService],
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  urls: Url[];
  userId: number;

  constructor(private urlService: UrlService, private userService: UserService) { }

  ngOnInit() {
    this.getData();
    // this.getUrls();
  }

  
  getData() {
    let token = localStorage.getItem('authToken') ? localStorage.getItem('authToken') : null;
    this.userService.getUserDataByToken(token).subscribe(userData => {
      this.userId = JSON.parse(userData).id;
      
      this.getUrls();
    });
  }

  getUrls() {
    this.urlService.getShortUrlDataByUser(this.userId).subscribe(res => {
      res = JSON.parse(res);
      for (let i = 0; i < res.length; i++) {
        res[i].shortUrl = `${window.location.origin}/${res[i].shortUrl}`;
      }

      this.urls = res;
      
    })
  }

}
