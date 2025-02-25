// Array methods and properties

console.log("Length");
const arr = [1, 2, 3, 4, 5, 1];
console.log(arr.length);

console.log("=====================");
console.log("ToString");
console.log(arr.toString());

console.log("=====================");
console.log("at");
console.log(arr.at(2));

console.log("=====================");
console.log("Join");
console.log(arr.join(" - "));
console.log(arr.join(" * "));

console.log("=====================");
console.log("Pop");
arr.pop();
console.log(arr);

console.log("=====================");
console.log("Push");
arr.push(6);
console.log(arr);

// 4. shift
console.log("=====================");
console.log("Shift");
arr.shift();
console.log(arr);

// 5. unshift
console.log("=====================");
console.log("Unshift");
arr.unshift(1);
console.log(arr);

console.log("=====================");
console.log("Delete");
delete arr[2]; // creates a empty hole in the array
console.log(arr);

console.log("=====================");
console.log("Concat");
console.log(arr.concat([7, 8, 9]));

console.log("=====================");
console.log("CopyWithin");
console.log(arr.copyWithin(2, 0));
console.log(arr.copyWithin(2, 0, 2));

console.log("=====================");
console.log("Flat");
console.log([1, 2, [3, 4]].flat());
console.log([1, 2, [3, 4, [5, [6]]]].flat(2));

console.log("=====================");
console.log("FlatMap");
console.log([1, 2, 3].flatMap((x) => [x, x * 10]));

console.log("=====================");
console.log("Splice");
console.log(arr);
console.log(arr.splice(4, 1, 3));
console.log(arr);
console.log(arr.splice(2, 1, "a", "b", "c"));
console.log(arr);

console.log("=====================");
console.log("toSpliced");
console.log(arr);
const spliced = arr.toSpliced(2, 1, "a", "b", "c");
console.log(spliced);
console.log(arr);

console.log("=====================");
console.log("Slice");
console.log(arr.slice(2, 4));

console.log("=====================");
console.log("toString");
console.log(arr.toString());