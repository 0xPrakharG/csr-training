const cars = ["BMW", "Audi", "Mercedes", "Toyota", "Ford"];

console.log("Before changing the element");
console.log(cars);
console.log(cars[0]);
console.log(cars[1]);
console.log(cars[6]);
cars[1] = "Ferrari";

console.log("=====================");
console.log("after changing the element");
console.log(cars);
console.log(cars[1]);

console.log("=====================");
console.log("Changing the array to string");
console.log(cars.toString());

console.log("=====================");
console.log("typeof cars");
console.log(typeof cars);

console.log("=====================");
console.log("Array.isArray(cars)");
console.log(Array.isArray(cars));

console.log("=====================");
console.log("cars instanceof Array");
console.log(cars instanceof Array);
