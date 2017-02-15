// Create the object "account"
import {Rank} from './rank';

export class Account {
    id: number;
    name: string;
    summonerLevel: number;

    // Summoner Rank
    rankSoloQ: Rank;
    rankFlex: Rank;
    rank3V3: Rank;
}