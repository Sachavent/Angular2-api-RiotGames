import { Injectable } from '@angular/core'
import { Account } from './account'
import { Rank } from './rank'
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';


@Injectable()

export class AccountService {
    private RiotApiUrl = 'https://euw.api.pvp.net';

    constructor(private http: Http) { }

    //Get Account basic information
    getAccountInformation(summonerName: string): Promise<Account> {
        /**
         * WARNING: DONT FORGET TO TRIM.. ELSE SECURITY PROBLEM IF THE USER ENTER DIRECTLY THE PATH
         */

        summonerName = summonerName.toLocaleLowerCase().trim();
        let url = `${this.RiotApiUrl}/api/lol/euw/v1.4/summoner/by-name/${summonerName}?api_key=RGAPI-650e27b6-8c7d-490b-a47d-afabc202e5b7`

        return this.http.get(url)
            .toPromise()
            //Telling that we should save the response as Account
            .then(response => {
                // Json utilisation: to get an index: ["Name of index"]
                return response.json()[summonerName];
            })
            .catch(this.handleError);
    }

    // Get user rank
    getAccountRank(compte: Account): Promise<Account> {
        console.log("id du compte: " + compte.id);
        let url = `${this.RiotApiUrl}/api/lol/euw/v2.5/league/by-summoner/${compte.id}/entry?api_key=RGAPI-650e27b6-8c7d-490b-a47d-afabc202e5b7`

        return this.http.get(url)
            .toPromise()
            //Telling that we should save the response as Account
            .then(response => {

                let reponse = response.json()[compte.id];
                /** Get Summoner Rank */
                // SoloQ
                let rankSoloQ: Rank = new Rank();
                rankSoloQ.pallier = reponse[0]['tier'];
                rankSoloQ.division = reponse[0]['entries'][0]['division'];
                rankSoloQ.LP = reponse[0]['entries'][0]['leaguePoints'];
                rankSoloQ.victoire = reponse[0]['entries'][0]['wins'];
                rankSoloQ.defaite = reponse[0]['entries'][0]['losses'];
                compte.rankSoloQ = rankSoloQ;

                // Flex
                let rankFlex: Rank = new Rank();
                rankFlex.pallier = reponse[1]['tier'];
                rankFlex.division = reponse[1]['entries'][0]['division'];
                rankFlex.LP = reponse[1]['entries'][0]['leaguePoints'];
                rankFlex.victoire = reponse[1]['entries'][0]['wins'];
                rankFlex.defaite = reponse[1]['entries'][0]['losses'];
                compte.rankFlex = rankFlex;


                // 3V3
                let rank3V3: Rank = new Rank();
                rank3V3.pallier = reponse[2]['tier'];
                rank3V3.division = reponse[2]['entries'][0]['division'];
                rank3V3.LP = reponse[2]['entries'][0]['leaguePoints'];
                rank3V3.victoire = reponse[2]['entries'][0]['wins'];
                rank3V3.defaite = reponse[2]['entries'][0]['losses'];
                compte.rank3V3 = rank3V3;

                return compte;
            })
            .catch(this.handleError);

    }

    // In case of any error happend
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // Priting the error
        return Promise.reject(error.message || error);
    }
}