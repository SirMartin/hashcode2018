export class vehicle{
    rides: number[];

    constructor(){
        this.rides = [];
    }

    getRidesText = () : string => {
        return this.rides.join(' ');
    }
}