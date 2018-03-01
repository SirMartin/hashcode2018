import { coordinate } from "./coordinate";
import { ride } from "./ride";

export class vehicle {
    rides: number[];
    position: coordinate;
    destination: coordinate;
    isFree: boolean;

    constructor() {
        this.rides = [];
        this.position = this.destination = new coordinate(0, 0);
        this.isFree = true;
    }

    move = () => {
        if (this.position.x !== this.destination.x) {
            // Move X
            if (this.position.x > this.destination.x)
                this.position.x--;
            else
                this.position.x++;
        } else if (this.position.y !== this.destination.y) {
            // Move Y
            if (this.position.y > this.destination.y)
                this.position.y--;
            else
                this.position.y++;
        }

        // Check if its finish.
        this.checkFinish();
    }

    checkFinish = () => {
        if (this.position.x === this.destination.x && this.position.y === this.destination.y)
            this.isFree = true;
    }

    setRide = (ride: ride) => {
        if (ride.start.x === this.position.x && ride.start.y === this.position.y) {
            this.rides.push(ride.id);
            this.destination = ride.end;
            this.isFree = false;
            ride.done = true;
        }
    }

    getRidesText = (): string => {
        return this.rides.join(' ');
    }
}