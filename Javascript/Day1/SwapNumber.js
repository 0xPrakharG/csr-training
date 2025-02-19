let a = 5;
let b = 10;

console.log("before swapping");
console.log("a = ", a);
console.log("b = ", b);

a = a + b;
b = a - b;
a = a - b;

console.log("after swapping");
console.log("a = ", a);
console.log("b = ", b);
