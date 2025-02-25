const arr = [1, 30, 4, 21, 10];

console.log("forEach");
arr.forEach((element, index) => {
    console.log(index, element);
});

console.log("==================");
console.log("map");
const newArr = arr.map((element, index) => {
    return element * 2;
});
console.log(newArr);

console.log("==================");
console.log("flatMap");
const newArr2 = arr.flatMap((element, index) => {
    return [element, element * 2];
});
console.log(newArr2);

console.log("==================");
console.log("filter");
const newArr3 = arr.filter((element, index) => {
    return element % 2 === 0;
});
console.log(newArr3);

console.log("==================");
console.log("reduce");
const sum = arr.reduce((acc, element) => {
    return acc + element;
}, 100);
console.log(sum);

console.log("==================");
console.log("reduceRight");
const sum2 = arr.reduceRight((acc, element) => {
    return acc + element;
}, 100);
console.log(sum2);

console.log("==================");
console.log("every");
const isAllEven = arr.every((element) => {
    return element % 2 === 0;
});
console.log(isAllEven);

console.log("==================");
console.log("some");
const isSomeEven = arr.some((element) => {
    return element % 2 === 0;
});
console.log(isSomeEven);

console.log("==================");
console.log("from");
const arrFrom = Array.from("Hello");
console.log(arrFrom);

console.log("==================");
console.log("keys");
const arrKeys = arr.keys();
for (const key of arrKeys) {
    console.log(key);
}

console.log("==================");
console.log("entries");
const arrEntries = arr.entries();
for (const entry of arrEntries) {
    console.log(entry);
}

console.log("==================");
console.log("with");
const arrWith = arr.with(3, 100);
console.log(arrWith);

console.log("==================");
console.log("Array Spread(...)");
const arrSpread = [1, 2, 3];
const arrSpread2 = [4, 5, 6];
const arrSpread3 = [...arrSpread, ...arrSpread2];
console.log(arrSpread3);
