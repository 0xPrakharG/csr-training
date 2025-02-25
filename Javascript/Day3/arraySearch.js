const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

console.log("IndexOf");
console.log(arr.indexOf(3));

console.log("=====================");
console.log("LastIndexOf");
console.log(arr.lastIndexOf(1));

console.log("=====================");
console.log("Includes");
console.log(arr.includes(2));

console.log("=====================");
console.log("Find");
console.log(arr.find((x) => x > 3));

console.log("=====================");
console.log("FindIndex");
console.log(arr);
console.log(arr.findIndex((x) => x > 3));

console.log("=====================");
console.log("FindLast");
console.log(arr.findLast((x) => x > 3));

console.log("=====================");
console.log("FindLastIndex");
console.log(arr.findLastIndex((x) => x > 3));
