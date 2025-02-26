const d = new Date();
console.log(d.toString());

const d1 = new Date("2021-07-01");
console.log(d1.toDateString());

const d2 = new Date("2021-07-01, 12:00:00");
console.log(d2.toUTCString());

const d3 = new Date(2025, 11, 12, 12, 30, 30, 0);
console.log(d3.toISOString());

const d4 = new Date(1740591409209);
console.log(d4);

const d5 = new Date("03/25/2015");
console.log(d5);

const d6 = new Date("03/25/2015 12:00:00");
console.log(d6);

const d7 = new Date("Mar 25 2015");
console.log(d7);

const d8 = new Date("January 25 2015");
console.log(d8);

const d9 = new Date("JANUARY, 25, 2015");
console.log(d9);

let msec = Date.parse("March 21, 2012");
console.log(msec);

let msec2 = Date.parse("March 21, 2012");
const d10 = new Date(msec2);
console.log(msec2);
console.log(d10);
