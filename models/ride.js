(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./coordinate"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var coordinate_1 = require("./coordinate");
    var ride = /** @class */ (function () {
        function ride(id, a, b, x, y, s, f) {
            this.id = id;
            this.start = new coordinate_1.coordinate(a, b);
            this.end = new coordinate_1.coordinate(x, y);
            this.earlyStart = s;
            this.latestFinish = f;
        }
        return ride;
    }());
    exports.ride = ride;
});
