function Circle(radius) {
    this.radius = radius;

    this.area = function () {
        return 3.14 * this.radius ** 2;
    };
}

const radius1 = 11;
const circle1 = new Circle(radius1);
console.log(`Area of the circle1 with radius ${radius1} is ${circle1.area()}`);

const radius2 = 15;
const circle2 = new Circle(radius2);
console.log(`Area of the circle2 with radius ${radius2} is ${circle2.area()}`);
