import { Component, OnInit } from '@angular/core';

import {Account} from '../account';

import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  compte: Account;

  constructor(private router: Router ) { }

  ngOnInit() {
}

goToAccountDetail(summonerName: string) {
  // We add the summonerName from Input into the Url
  /**
   * WARNING: DONT FORGET : ToLowerCase() and Trim()
   */
  let link = ['detail', summonerName.toLocaleLowerCase().trim()];
  this.router.navigate(link);
}

}
