import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { AccountService } from '../account.service';

import { Account } from '../account';

import 'rxjs/add/operator/switchMap';
import { Pipe } from "@angular/core";

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.css'],
})
export class AccountDetailComponent implements OnInit {

  compte: Account;
  imgUrl: string;

  constructor(private accountService: AccountService, private route: ActivatedRoute) { }

  ngOnInit() {
    /** Getting account information from the Riot API */
    this.route.params
      .switchMap((params: Params) => this.accountService.getAccountInformation(params['name']))
      .subscribe(account => {

        /** Get rank from the account choosen
         * WARNING: We have to wait until we got the account
         */
        this.accountService.getAccountRank(account)
          .then(account => {

            /**
             * Getting Champion played by this account
             */
            this.accountService.getChampionPlayed(account)
              .then(account => {

                // Final account with basic information + ranks + Champion played
                this.compte = account;

                //Set the URL to get profile Icon 
                this.imgUrl = `http://ddragon.leagueoflegends.com/cdn/7.3.2/img/profileicon/${this.compte.profileIconId}.png`;

              });
         
          });
      });


  }

}
