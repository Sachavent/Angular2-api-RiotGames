import { Injectable } from '@angular/core'
import { Account } from './account'
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()

export class AccountService {
    private RiotApiUrl = 'https://euw.api.pvp.net/api/lol/euw/v1.4/summoner/by-name/Ag%C3%A0thos?api_key=RGAPI-650e27b6-8c7d-490b-a47d-afabc202e5b7';

    constructor(private http: Http) { }

    //Get Account basic information
    getAccountInformation(): Promise<Account> {
        return this.http.get(this.RiotApiUrl )
            .toPromise()
            //Telling that we should save the response as Account
            .then(response => response.json().agàthos as Account)
            .catch(this.handleError);
    }

    // In case of any error happend
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // Priting the error
        return Promise.reject(error.message || error);
    }
}