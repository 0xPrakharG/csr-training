const numberOfTerms = 10;
let n = 0;
let n1 = 1;
let nextTerm;

console.log("Fibonacci Series:");
for (let i = 1; i <= numberOfTerms; i++) {
    console.log(n);
    nextTerm = n + n1;
    n = n1;
    n1 = nextTerm;
}
