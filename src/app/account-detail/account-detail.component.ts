import { Component, OnInit } from '@angular/core';

import {AccountService} from '../account.service';

import { Account } from '../account';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.css']
})
export class AccountDetailComponent implements OnInit {

  compte: Account;

  constructor(private accountService: AccountService) { }

  ngOnInit() {
     this.accountService.getAccountInformation()
    .then(account => {
      console.log("account: "+account.id);
      this.compte= account;
      console.log("compte: "+this.compte.id);
  })
  }

}
