export class city{
    rows: number;
    cols: number;
    numVehicles: number;
    numRides: number;
    bonusOnTime: number;
    steps: number;

    constructor(rows: number, cols: number, numVehicles: number, numRides: number, bonusOnTime: number, steps: number) {
        this.rows = rows;
        this.cols = cols;
        this.numVehicles = numVehicles;
        this.numRides = numRides;
        this.bonusOnTime = bonusOnTime;
        this.steps = steps;
    }
}