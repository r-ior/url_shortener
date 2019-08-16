import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UrlService } from '../url/url.service';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  providers: [UrlService],
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit {

  constructor( private route: ActivatedRoute,  private urlSerivce: UrlService ) { }

  ngOnInit() {
    let short = this.route.snapshot.params['short']; 

    this.urlSerivce.getShortUrlData(short).subscribe(res => {
      window.location.href = res.originalUrl;
    })
  }

}
