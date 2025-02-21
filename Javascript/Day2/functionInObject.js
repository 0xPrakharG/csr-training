const numbers = {
    firstNumber: 50,
    lastNumber: 23,
    add: function () { // or add() {
        return this.firstNumber + this.lastNumber;
    },
};

console.log(numbers.add());
