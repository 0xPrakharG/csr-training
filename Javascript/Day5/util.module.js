export class Circle {
    constructor(radius) {
        this.radius = radius;
    }

    area() {
        return 3.14 * this.radius ** 2;
    }

    perimeter() {
        return 2 * 3.14 * this.radius;
    }
}

export class Shape {
    constructor(side) {
        this.side = side;
    }

    area() {
        return this.side ** 2;
    }

    perimeter() {
        return 4 * this.side;
    }
}
