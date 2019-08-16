import { Component, OnInit } from '@angular/core';
import { AccountGuard } from './account.guard';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  providers: [AccountGuard],
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
