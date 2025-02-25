const arr = [1, 30, 4, 21, 10];
const arr2 = ["Mango", "Apple", "Banana", "Pineapple", "Orange"];

console.log("Sort");
console.log(arr.sort());
console.log(arr2.sort());

console.log("==================");
console.log("toSorted");
const sortedNum = arr.toSorted();
console.log(sortedNum);
const sortedAlpha = arr2.toSorted();
console.log(sortedAlpha);

console.log("==================");
console.log("toReversed");
const reversedNum = arr.toReversed();
console.log(reversedNum);
const reversedAlpha = arr2.toReversed();
console.log(reversedAlpha);

console.log("==================");
console.log("Reverse");
console.log(arr.reverse());
console.log(arr2.reverse());


