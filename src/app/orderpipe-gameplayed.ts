import { Pipe } from "@angular/core";

@Pipe({
  name: "OrderByGamePlayed"
})
export class OrderByGamePlayed {
  transform(array: Array<string>, args: string): Array<string> {
    array.sort((a: any, b: any) => {
      if (a.totalSessionsPlayed > b.totalSessionsPlayed) {
        return -1;
      } else if (a.totalSessionsPlayed < b.totalSessionsPlayed) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }
}