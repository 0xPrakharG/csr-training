const myObj = {
    name: "John",
    age: 30,
    cars: [
        { name: "Ford", models: ["Fiesta", "Focus", "Mustang"] },
        { name: "BMW", models: ["320", "X3", "X5"] },
        { name: "Fiat", models: ["500", "Panda"] },
    ],
};

console.log("Accessing the nested array");
for (let i = 0; i < myObj.cars.length; i++) {
    console.log(myObj.cars[i].name);
    for (let j = 0; j < myObj.cars[i].models.length; j++) {
        console.log(myObj.cars[i].models[j]);
    }
}
