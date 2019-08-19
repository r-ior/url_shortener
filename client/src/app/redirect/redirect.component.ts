import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UrlService } from '../url/url.service';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  providers: [UrlService],
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit {

  constructor( private route: ActivatedRoute,  private urlSerivce: UrlService, private router: Router ) { }

  ngOnInit() {
    let short = this.route.snapshot.params['short']; 

    this.urlSerivce.getShortUrlData(short).subscribe(res => {
      window.location.href = res.originalUrl;
    }, error => {
      this.router.navigate(['']);
    });
  }

}
