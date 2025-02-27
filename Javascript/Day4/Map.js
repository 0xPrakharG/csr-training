const phones = new Map([
    ["Iphone", 512],
    ["Galaxy", 1024],
    ["Hawei", 512],
]);
console.log(phones);

const phones2 = new Map();
phones2.set("Iphone", 512);
phones2.set("Galaxy", 1024);
phones2.set("Hawei", 512);
phones2.set("Samsung", 512);
console.log(phones2);

console.log(phones.get("Iphone"));
console.log(phones2.set("Samsung", 712));
console.log(phones.size);
console.log(phones2.delete("Samsung"));
console.log(phones2);

console.log(phones.clear());

console.log(phones);

console.log(phones2.has("Iphone"));
