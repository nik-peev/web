// Function that provides inheritance
Function.prototype.inherit = function (parent) {
    this.prototype = new parent();
    this.prototype.constructor = parent;
};

var VehiclesNS = (function VehiclesNS() {

    var AfterburnerState = {
        "DEACTIVATED": 0,
        "ACTIVATED": 1
    };

    Object.freeze(AfterburnerState);

    var SpinDirection = {
        "CLOCKWISE": 1,
        "COUNTERCLOCKWISE": -1
    };

    Object.freeze(SpinDirection);

    var AmphibianMode = {
        "LAND": 1,
        "WATER": 2
    };

    Object.freeze(AmphibianMode);

    function Vehicle(speed, propulsionUnits) {
        this.speed = speed;
        this.propulsionUnits = propulsionUnits;
    }

    Vehicle.prototype.accelerate = function () {
        var length = this.propulsionUnits.length;

        for (var i = 0; i < length; i++) {
            this.speed = this.speed + this.propulsionUnits[i].getAcceleration();
        }
    };

    function LandVehicle(speed, wheels) {
        Vehicle.apply(this, speed, wheels);
    }

    LandVehicle.inherit(Vehicle);

    function AirCraft(speed, propellingNozzle) {
        Vehicle.apply(this, speed, propellingNozzle);
    }

    AirCraft.inherit(Vehicle);

    Aircraft.prototype.switchAfterburners = function (afterburnerState) {
        var length = this.propulsionUnits.length;

        for (var i = 0; i < length; i++) {
            if (this.propulsionUnits[i] instanceof PropellingNozzle) {
                this.propulsionUnits[i].afterburnerState = afterburnerState;
            }
        }
    };

    function Watercraft(speed, propellers) {
        Vehicle.apply(this, speed, propellers);
    }

    Watercraft.inherit(Vehicle);

    Watercraft.prototype.setPropellersSpinDirection = function (spinDirection) {
        var length = this.propulsionUnits.length;

        for (var i = 0; i < length; i++) {
            if (this.propulsionUnits[i] instanceof Propeller) {
                this.propulsionUnits[i].spinDirection = spinDirection;
            }
        }
    };

    function PropulsionUnit() {
    }

    function Wheel(radius) {
        this.radius = radius;
    }

    Wheel.inherit(PropulsionUnit);

    Wheel.prototype.getAcceleration = function () {
        return 2 * Math.PI * this.radius | 0;
    };

    function PropellingNozzle(power, afterburnerState) {
        this.power = power;
        this.afterburnerState = afterburnerState;
    }

    PropellingNozzle.inherit(PropulsionUnit);

    PropellingNozzle.prototype.getAcceleration = function () {
        if (this.afterburnerState === AfterburnerState.Activated) {
            return 2 * this.power;
        } else {
            return this.power;
        }
    };

    function Propeller(fins, spinDirection) {
        this.fins = fins;
        this.spinDirection = spinDirection;
    }

    Propeller.inherit(PropulsionUnit);

    Propeller.prototype.getAcceleration = function () {
        if (this.spinDirection === spinDirection.CLOCKWISE) {
            this.fins;
        }
        else {
            -this.fins;
        }
    };

    return {
        AfterburnerState: AfterburnerState,
        SpinDirection: SpinDirection,
        AmphibianMode: AmphibianMode,
        Wheel: Wheel,
        PropellingNozzle: PropellingNozzle,
        Propeller: Propeller,
        LandVehicle: LandVehicle,
        Aircraft: Aircraft,
        Watercraft: Watercraft,
    };
})();

