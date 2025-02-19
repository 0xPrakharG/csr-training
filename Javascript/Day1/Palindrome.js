let number = 1221;
let originalNumber = number;
let reverse = 0;

while (number > 0) {
    let rem = number % 10;
    reverse = reverse * 10 + rem;
    number = Math.floor(number / 10);
}
if (reverse === originalNumber) {
    console.log("Palindrome");
} else {
    console.log("Not Palindrome");
}