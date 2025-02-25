const arr = [];
arr["firstName"] = "Prakhar";
arr["lastName"] = "Goyal";
arr["age"] = 23;
console.log(arr);
console.log(arr.firstName);

console.log("=====================");
console.log("objects in arrays");
const arr1 = [];
arr1.person1 = {
    firstName: "Prakhar",
    lastName: "Goyal",
    age: 23,
};
arr1.person2 = {
    firstName: "John",
    lastName: "Doe",
    age: 30,
};
console.log(arr1);
console.log(arr1.person1);
console.log(arr1.person1.firstName);

console.log("=====================");
console.log("new Array()");
const arr2 = new Array();
arr2["firstName"] = "Prakhar";
arr2["lastName"] = "Goyal";
arr2["age"] = 23;
console.log(arr2);

const arr3 = new Array(3, 20, 30);
console.log(arr3);

const arr4 = new Array(3); // creates an array of length 3 with undefined values
console.log(arr4);
