import { coordinate } from "./coordinate";

export class ride{
    id: number;
    start: coordinate;
    end: coordinate;
    earlyStart: number;
    latestFinish: number;
    distance: number = 0;

    constructor(id:number, a:number,b:number,x:number,y:number,s:number,f:number){
        this.id = id;
        this.start = new coordinate(a, b);
        this.end = new coordinate(x, y);
        this.earlyStart = s;
        this.latestFinish = f;
    }

   public sortRidesByDistance(rides: ride[]) {
        rides.forEach(ride => {
            ride.distance = Math.abs(ride.start.x - ride.end.y) + Math.abs(ride.end.x - ride.end.y);
        });
    
        rides.sort((a,b) => {
            if(a.distance < b.distance) {
                return -1;
            } else if(a.distance > b.distance) {
                return 1;
            } else {
                return 0;
            }
        });
    }
}