import { Circle } from "./util.module.js";
import { Shape } from "./util.module.js";

const obj = new Circle(34);
console.log(obj.area());
console.log(obj.perimeter());

const obj2 = new Shape(5);
console.log(obj2.area());
console.log(obj2.perimeter());
