import { Injectable } from '@angular/core'
import { Account } from './account'
import { Rank } from './rank'
import { Champion } from './champion'
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
            .then(response => {
                // Json utilisation: to get an index: ["Name of index"]
                return response.json()[summonerName];
            })
            .catch(this.handleError);
    }

    // Get user rank
    getAccountRank(compte: Account): Promise<Account> {
        let url = `${this.RiotApiUrl}/api/lol/euw/v2.5/league/by-summoner/${compte.id}/entry?api_key=RGAPI-650e27b6-8c7d-490b-a47d-afabc202e5b7`

        return this.http.get(url)
            .toPromise()
            //Telling that we should save the response as Account
            .then(response => {

                // Initialise at empty, to be sure of any security problem
                compte.ranks = [];

                /** Get Summoner Rank
                 * We're using map to iterate
                 */
                response.json()[compte.id].map((entry) => {
                    //console.log(entry);

                    /**Using push to create a Rank in the account" */
                    compte.ranks.push({
                        /**Creating a new rank that we push into the account */
                        queue: entry.queue,
                        pallier: entry.tier,
                        division: entry.entries[0].division,
                        LP: entry.entries[0].leaguePoints,
                        victoire: entry.entries[0].wins,
                        defaite: entry.entries[0].losses
                    });
                })

                return compte;
            })
            .catch(this.handleError);
    }


    // Get Most-played champion
    getChampionPlayed(compte: Account): Promise<Account> {
        let url = `${this.RiotApiUrl}/api/lol/euw/v1.3/stats/by-summoner/${compte.id}/ranked?api_key=RGAPI-650e27b6-8c7d-490b-a47d-afabc202e5b7`

        return this.http.get(url)
            .toPromise()
            .then(response => {
                /**
                 * Using the same way of getting User rank
                */

                compte.champions = [];
                response.json()['champions'].map((entry) => {
                    /**
                     * WARNING: DONT GET THE ID == 0 : doesn't match to any champion
                     */
                    if (entry.id != 0) {
                        compte.champions.push({
                            id: entry.id,
                            name: this.getChampionName(entry.id),
                            totalSessionsPlayed: entry.stats.totalSessionsPlayed,
                            totalSessionsLost: entry.stats.totalSessionsLost,
                            totalSessionsWon: entry.stats.totalSessionsWon
                        });
                    }
                })

                console.log("nom champion: ", compte.champions[6].name);

                return compte;
            })
            .catch(this.handleError);
    }

    // Getting the champion name by id
    getChampionName(id: number): Promise<string> {
        console.log ("id qu'on cherche: "+id);
        let url = `https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion/${id}?api_key=RGAPI-650e27b6-8c7d-490b-a47d-afabc202e5b7`
        /** We're checking that id != 0 (which is the last element)
         * Indeed, id == 0 doesn't match any champion name
        */
        return this.http.get(url)
            .toPromise()
            .then(response => {

                return response.json()['name'];
            }).catch(this.handleError)
            ;
    }

    // In case of any error happend
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // Priting the error
        return Promise.reject(error.message || error);
    }
}