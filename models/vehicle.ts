import { coordinate } from "./coordinate";
import { ride } from "./ride";

export class vehicle {
    id: number;
    rides: number[];
    position: coordinate;
    destination: coordinate;
    isFree: boolean;
    isVehicleInPosition: boolean;

    assignedRide: ride;

    constructor(id: number) {
        this.id = id;
        this.rides = [];
        this.position = this.destination = new coordinate(0, 0);
        this.isFree = true;
    }

    move = (actualStep: number) => {
        //console.log("MOVING COCHE " + this.id);
        // Si no tenemos viaje, nos quedamos quietecitos.
        if (this.assignedRide === null)
            return;

        if (this.position.x === this.assignedRide.start.x && this.position.y === this.assignedRide.start.y) {
            this.isVehicleInPosition = true;
        }

        if (this.isVehicleInPosition) {
            if (actualStep >= this.assignedRide.earlyStart) {
                // Puedo empezar el viaje.
                // Estoy en posicion, puedo empezar.
                this.moveToDestination();
                // Check if its finish.
                this.checkFinish();
            }else{
                // Wait
            }
        } else {
            this.moveToStartRide();
        }
    }

    moveToStartRide = () => {
        if (this.position.x !== this.assignedRide.start.x) {
            // Move X
            if (this.position.x > this.assignedRide.start.x)
                this.position.x--;
            else
                this.position.x++;
        } else if (this.position.y !== this.assignedRide.start.y) {
            // Move Y
            if (this.position.y > this.assignedRide.start.y)
                this.position.y--;
            else
                this.position.y++;
        }
    }

    moveToDestination = () => {
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
    }

    checkFinish = () => {
        if (this.position.x === this.destination.x && this.position.y === this.destination.y) {
            this.isFree = true;
            this.isVehicleInPosition = false;
            this.assignedRide = null;
        }
    }

    setRide = (ride: ride) => {
        console.log("COCHE " + this.id + " - VIAJE " + ride.id);
        this.rides.push(ride.id);
        this.assignedRide = ride;
        this.destination = ride.end;
        this.isFree = false;
        ride.done = true;
    }

    getRidesText = (): string => {
        return this.rides.join(' ');
    }
}