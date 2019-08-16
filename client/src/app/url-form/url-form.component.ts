import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Url } from '../url/url.model';
import { UrlService } from '../url/url.service';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-url-form',
  templateUrl: './url-form.component.html',
  providers: [UrlService, UserService],
  styleUrls: ['./url-form.component.scss']
})
export class UrlFormComponent {
  urlInfo: Url;
  private userId: number; 

  constructor(private urlService: UrlService, private userService: UserService) { }
  public origin = window.location.origin;

  onSubmit(form: NgForm) {
    let token = localStorage.getItem('authToken') ? localStorage.getItem('authToken') : null;
    this.userService.getUserDataByToken(token).subscribe(userData => {
      this.userId = JSON.parse(userData).id;

      let urlData: Url = { user: this.userId, originalUrl: form.value.originalUrl, shortUrl: form.value.shortUrl };
      this.urlService.saveShortUrlData(urlData).subscribe(res => {
        let data = JSON.parse(res);
  
        data.shortUrl = `${this.origin}/${data.shortUrl}`;
        this.urlInfo = data;
      });
    });
  }
}
