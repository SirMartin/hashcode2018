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

    
}