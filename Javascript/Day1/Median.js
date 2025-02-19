const arr = [12, 15, 99, 34, 56];
const numberOfElements = arr.length;
arr.sort();
console.log(arr);

switch (numberOfElements % 2) {
    case 0:
        let medianIndhigh = numberOfElements / 2;
        let medianIndlow = medianIndhigh - 1;
        let medianVal = (arr[medianIndlow] + arr[medianIndhigh]) / 2;
        console.log("median is =", medianVal);
        break;
    case 1:
        const medianIndex = (numberOfElements + 1) / 2;
        const median = arr[medianIndex - 1];
        console.log("median is =", median);
        break;
}
