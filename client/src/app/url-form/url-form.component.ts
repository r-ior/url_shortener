import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Url } from '../url/url.model';
import { UrlService } from '../url/url.service';

@Component({
  selector: 'app-url-form',
  templateUrl: './url-form.component.html',
  providers: [UrlService],
  styleUrls: ['./url-form.component.scss']
})
export class UrlFormComponent {
  urlInfo: Url;

  constructor(private urlService: UrlService) { }

  onSubmit(form: NgForm) {
    let urlData: Url = { originalUrl: form.value.originalUrl, shortUrl: form.value.shortUrl };
    this.urlService.saveShortUrlData(urlData).subscribe(res => {
      let data = JSON.parse(res);

      this.urlInfo = data;
      this.urlInfo.shortUrl = `${window.location.origin}/${data.shortUrl}`;
    });
  }
}
