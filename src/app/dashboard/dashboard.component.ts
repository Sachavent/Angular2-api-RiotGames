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

  constructor(private router: Router ) {}

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

/**
 * what is happening when we press a key in the inputfield
 * searching the summoner after pressing enter
 * @param event 
 * @param summonerName 
 */
onKeyPressed(event:any, summonerName: string) {
  // If enter is pressed, go to account detail
  if (event.key === "Enter") {
    this.goToAccountDetail(summonerName); 
  }
}

}
