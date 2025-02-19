// Hello World
console.log("Hello World");

// adding to numbers
console.log(5 + 6);
console.log("5" + 6);
console.log(5 + "6");

// double and triple equals operator
console.log(5 == 6);
console.log(5 == 5);
console.log(5 == "5");
console.log(5 === "5");

// var - global scope
console.log("==================== var ====================");
var a = 5;
console.log("a =", a);
{
    var a = 6;
}
console.log("after redeclare");
console.log("a =", a);

// let - block scope
console.log("==================== let ====================");
let b = 5;
console.log("b =", b);
{
    let b = 6;
    console.log("inside other block, redeclare");
    console.log("b =", b);
    b = 4;
    console.log("inside other block, reassign");
    console.log("b =", b);
}
console.log("after changes");
console.log("b =", b);
