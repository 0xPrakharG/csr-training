const arr = [];

arr[0] = Date.now();
arr[1] = "Hello";
arr[2] = 1;
arr[5] = "World"; // empty hole will be created between 2 and 5 index

console.log("Before pushing the element");
console.log(arr);

arr.push("World");
arr.push(2);
console.log("=====================");
console.log("After pushing the element");
console.log(arr);

console.log("=====================");
console.log("Accessing the last element");
console.log(arr[arr.length - 1]);

console.log("=====================");
console.log("Looping through the array");
for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
}

console.log("=====================");
console.log("forEach Method");
arr.forEach((element) => {
    console.log(element);
});
