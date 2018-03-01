var fs: any = require("fs");
import { city } from "./models/city";
import { ride } from "./models/ride";
import { vehicle } from "./models/vehicle";
import { coordinate } from "./models/coordinate";

/*READING */
var INPUT_FILE: string = process.argv[2];
var OUTPUT_FILE: string = process.argv[2].replace("input\\", "");

console.log("Parsing " + INPUT_FILE + " file...");
var time: number = Date.now();
var fileData: string = fs.readFileSync(INPUT_FILE).toString();

// Parsing data
var rows: string[] = fileData.split(/\r?\n/g);
var input = rows[0].split(/\s/g);

// Parsing the city
var theCity: city = new city(parseInt(input[0]), parseInt(input[1]), parseInt(input[2]), parseInt(input[3]), parseInt(input[4]), parseInt(input[5]));
console.log(theCity);
rows.splice(0, 1);
rows.splice(rows.length - 1, 1);

const rides: ride[] = [];
for (var i = 0; i < rows.length; i++) {
    var d = rows[0].split(/\s/g);
    rides.push(new ride(i,
        parseInt(d[0]),
        parseInt(d[1]),
        parseInt(d[2]),
        parseInt(d[3]),
        parseInt(d[4]),
        parseInt(d[5])))
}

sortRidesByDistance(rides);

//const data = rows.map(d => d.split("").map(e => e === "T"));
//console.log(data);
console.log("Data read and parsed in " + (-time + (time = Date.now())) + "ms");

var vehicles: vehicle[] = [];
for (var i = 0; i < theCity.numVehicles; i++)
    vehicles.push(new vehicle());


console.log("Creating output");
time = Date.now();
createOutput(vehicles);

console.log("Output done in " + (-time + (time = Date.now())) + "ms");

function createOutput(vehicles: vehicle[]) {
    if (!fs.existsSync(`./output`))
        fs.mkdirSync(`./output`);

    fs.writeFileSync(`./output/${OUTPUT_FILE.replace(/\..*$/, "")}.out`,
        vehicles.map(s => s.rides.length + " " + s.getRidesText()).join(`\n`)
    );
}

function sortRidesByDistance(rides: ride[]) {
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

function getDistance(a: coordinate, b: coordinate) {
    Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

function getTheBestRide(position: coordinate, actualStep: number): ride {
    //Position es la position del coche

    let ridesToDo = rides.filter(ride => {
        ride.done === false && ((actualStep + ride.distance) <= ride.latestFinish)});
    
    let arrRides = [];
    ridesToDo.forEach(ride => {
        const f = ride.getCost(position, actualStep);
        arrRides.push(f);
    });
    
    var index = arrRides.indexOf(Math.min(...arrRides));
    return ridesToDo[index];
    
    
}

function simulate(theCity: city, vehicles: vehicle[], rides: ride[]) {
    for (var i = 0; i < theCity.steps; i++) {
        for (var j = 0; j < vehicles.length; j++) {
            const v = vehicles[j];
            if (v.isFree) {
                var selectedRide = getTheBestRide(v.position, i);
                v.setRide(selectedRide);
            }

            // Move each step.
            v.move();
        }
    }
}