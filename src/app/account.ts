// Create the object "account"
import {Rank} from './rank';
import { Champion } from './champion'

export class Account {
    id: number;
    name: string;
    summonerLevel: number;
    profileIconId: number;

    // Summoner Rank
    ranks: Array <Rank>;
    champions: Array<Champion>;
}