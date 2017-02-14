import { Component, OnInit } from '@angular/core';

import {Account} from '../account';
import {AccountService} from '../account.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  account: Account;

  constructor(private accountService: AccountService) { }

  ngOnInit() {
    this.accountService.getAccountInformation()
    .then(account => this.account= account)
  }

}
