const s = new Set();

s.add("a");
s.add("b");
s.add("c");

console.log(s);

const s2 = new Set(["a", "b", "c"]);
console.log(s2);

console.log(s2 instanceof Set);

// Set Methods
console.log(s.add("v"));

console.log(s2.has("c"));

s.forEach((item) => console.log(item));

console.log(s.values());

console.log(s.keys());

console.log(s.entries());

console.log(s);
