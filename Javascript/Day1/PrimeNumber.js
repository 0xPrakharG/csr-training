const number = 1;
let isPrime = true;
if (number === 1) {
    console.log("neither prime nor composite");
    return;
}
for (let i = 2; i < number; i++) {
    if (number % i === 0) {
        isPrime = false;
        break;
    }
}
if (isPrime) {
    console.log("Prime number");
} else {
    console.log("Composite number");
}
