// Different type of object creation in Javascript

console.log("General Object");
const employee = {
    firstName: "Prakhar",
    lastName: "Goyal",
    age: 23,
    contactNumber: 9305321232,
};

console.log(employee);

console.log("Creating with new Object()");
let employee2 = new Object();
employee2.firstName = "Prakhar";
employee2.lastName = "Goyal";
employee2.age = 23;
employee2.contactNumber = 9220020202;

console.log(employee2);

console.log("Creation with Empty Object'{}'");
let employee3 = {};
employee3.firstName = "Prakhar";
employee3.lastName = "Goyal";
employee3.age = 23;
employee3.contactNumber = 9220020202;

console.log(employee3);
