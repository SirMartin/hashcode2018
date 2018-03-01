(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var city = /** @class */ (function () {
        function city(rows, cols, numVehicles, numRides, bonusOnTime, steps) {
            this.rows = rows;
            this.cols = cols;
            this.numVehicles = numVehicles;
            this.numRides = numRides;
            this.bonusOnTime = bonusOnTime;
            this.steps = steps;
        }
        return city;
    }());
    exports.city = city;
});
