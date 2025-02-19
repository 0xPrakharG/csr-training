let number = 153;
let sum = 0;
let originalNumber = number;
while (number > 0) {
    let remainder = number % 10;
    sum += remainder * remainder * remainder;
    number = Math.floor(number / 10);
}
if (sum == originalNumber) {
    console.log("Armstrong Number");
} else {
    console.log("Not an Armstrong Number");
}
