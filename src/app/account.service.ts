import { Injectable } from '@angular/core'
import { Account } from './account'
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()

export class AccountService {
    private RiotApiUrl = 'https://euw.api.pvp.net';

    constructor(private http: Http) { }

    //Get Account basic information
    getBasicAccountInformation(summonerName: string): Promise<Account> {
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

    // In case of any error happend
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // Priting the error
        return Promise.reject(error.message || error);
    }
}