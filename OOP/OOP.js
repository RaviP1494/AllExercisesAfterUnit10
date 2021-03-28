class Vehicle {
    constructor(make, model, year) {
        this.make = make;
        this.model = model;
        this.year = year;
        this.isVehicle = true;
    }
    honk() {
        return "Beep";
    }
    toString() {
        return `This vehicle is a ${this.make} ${this.model} from ${this.year}`;
    }
}

class Car extends Vehicle {
    constructor(make, model, year) {
        super(make, model, year);
        this.numWheels = 4;
    }
}

class Motorcycle extends Vehicle {
    constructor(make, model, year) {
        super(make, model, year);
        this.numWheels = 2;
    }
    revEngine() {
        return 'VROOM!!!';
    }
}

class Garage {
    constructor(cap) {
        this.capacity = cap;
        this.vehicles = [];
    }
    add(v) {
        if (!v.isVehicle) {
            return "Only vehicles are allowed here";
        }
        else if (this.vehicles.length >= this.capacity) {
            return "Sorry, we're full";
        }
        this.vehicles.push(v);
        return this.vehicles;
    }
}