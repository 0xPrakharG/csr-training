class Circle {
    constructor(radius) {
        this.radius = radius;
    }

    area() {
        return 3.14 * this.radius * this.radius;
    }
    perimeter() {
        return 2 * 3.14 * this.radius;
    }
}

const circle1 = new Circle(12);
console.log(circle1.area().toFixed(2));
console.log(circle1.perimeter());

const circle2 = new Circle(12);
console.log(circle2.area().toFixed(2));
console.log(circle2.perimeter());
