// Create the object "account"
import {Rank} from './rank';

export class Account {
    id: number;
    name: string;
    summonerLevel: number;
    profileIconId: number;

    // Summoner Rank
    ranks: Array <Rank>;
}