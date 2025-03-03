const person = {
    firstName: "Prakhar",
    lastName: "Goyal",
};

console.log(person);
console.log(JSON.stringify(person));

const person2 = '{"firstName": "Prakhar", "lastName": "Goyal"}';
console.log(person2);
console.log(JSON.parse(person2));
