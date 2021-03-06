import { coordinate } from "./coordinate";

export class ride{
    id: number;
    start: coordinate;
    end: coordinate;
    earlyStart: number;
    latestFinish: number;
    distance: number = 0;
    done: boolean = false;

    constructor(id:number, a:number,b:number,x:number,y:number,s:number,f:number){
        this.id = id;
        this.start = new coordinate(a, b);
        this.end = new coordinate(x, y);
        this.earlyStart = s;
        this.latestFinish = f;
    }

    getCost = (position: coordinate, actualStep: number) : number => {
        return this.getDistance(position, this.start) + ((actualStep < this.earlyStart) ? this.earlyStart - actualStep : 0);
    }

    hasBonus = (position: coordinate, actualStep: number) : boolean => {
        return (actualStep - this.earlyStart) >= this.getDistance(position, this.start);
    }

    getDistance = (a: coordinate, b: coordinate) : number => {
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
    }

    
}