// Creating object champion for champion most-played (with winrate)
export class Champion {
    id:number;
    name: Promise<string>;
    totalSessionsPlayed : number;
    totalSessionsLost : number;
    totalSessionsWon : number;
}