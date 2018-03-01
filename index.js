(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./models/city", "./models/ride", "./models/vehicle"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var fs = require("fs");
    var city_1 = require("./models/city");
    var ride_1 = require("./models/ride");
    var vehicle_1 = require("./models/vehicle");
    /*READING */
    var INPUT_FILE = process.argv[2];
    var OUTPUT_FILE = process.argv[2].replace("input\\", "");
    console.log("Parsing " + INPUT_FILE + " file...");
    var time = Date.now();
    var fileData = fs.readFileSync(INPUT_FILE).toString();
    // Parsing data
    var rows = fileData.split(/\r?\n/g);
    var input = rows[0].split(/\s/g);
    // Parsing the city
    var theCity = new city_1.city(parseInt(input[0]), parseInt(input[1]), parseInt(input[2]), parseInt(input[3]), parseInt(input[4]), parseInt(input[5]));
    rows.splice(0, 1);
    rows.splice(rows.length - 1, 1);
    var rides = [];
    for (var i = 0; i < rows.length; i++) {
        var d = rows[0].split(/\s/g);
        rides.push(new ride_1.ride(i, parseInt(d[0]), parseInt(d[1]), parseInt(d[2]), parseInt(d[3]), parseInt(d[4]), parseInt(d[5])));
    }
    //const data = rows.map(d => d.split("").map(e => e === "T"));
    //console.log(data);
    console.log("Data read and parsed in " + (-time + (time = Date.now())) + "ms");
    var vehicles = [];
    for (var i = 0; i < theCity.numVehicles; i++)
        vehicles.push(new vehicle_1.vehicle());
    vehicles[0].rides.push(1);
    vehicles[0].rides.push(0);
    vehicles[1].rides.push(2);
    console.log("Creating output");
    time = Date.now();
    createOutput(vehicles);
    console.log("Output done in " + (-time + (time = Date.now())) + "ms");
    function createOutput(vehicles) {
        if (!fs.existsSync("./output"))
            fs.mkdirSync("./output");
        fs.writeFileSync("./output/" + OUTPUT_FILE.replace(/\..*$/, "") + ".out", vehicles.map(function (s) { return s.getRidesText(); }).join("\n"));
    }
});
