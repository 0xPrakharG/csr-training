export default class Shape {
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
