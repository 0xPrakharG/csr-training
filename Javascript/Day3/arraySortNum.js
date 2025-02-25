const arr = [1, 30, 4, 21, 10];

console.log("Sort Asc");
console.log(
    arr.sort(function (a, b) {
        return a - b;
    })
);

console.log("Sort Desc");
console.log(
    arr.sort(function (a, b) {
        return b - a;
    })
);

console.log("==================");
console.log("Random");
console.log(arr.sort(() => 0.6 - Math.random()));

console.log("==================");
console.log("Fisher Yates Method for shuffle");
for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
console.log(arr);

console.log("==================");
console.log("Min");
console.log(Math.min.apply(null, arr));

console.log("==================");
console.log("Max");
console.log(Math.max.apply(null, arr));
