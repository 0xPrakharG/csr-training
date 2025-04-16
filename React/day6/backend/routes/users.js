import express from "express";
import { v4 as uuidv4 } from "uuid";
const router = express.Router();

let users = [];

router.get("/", (req, res) => {
    res.send(users);
});

router.post("/", (req, res) => {
    const user = req.body;
    user && users.push({ ...user, id: uuidv4() });
    res.send(`${user.firstName} has been added to the Database.`);
});

router.put("/:id", (req, res) => {
    const { id } = req.params;
    const {
        firstName,
        lastName,
        maidenName,
        age,
        gender,
        email,
        phone,
        username,
        password,
        birthDate,
    } = req.body;

    const user = users.find((user) => user.id === id);
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (maidenName) user.maidenName = maidenName;
    if (age) user.age = age;
    if (gender) user.gender = gender;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (username) user.username = username;
    if (password) user.password = password;
    if (birthDate) user.birthDate = birthDate;

    res.send(`User with the ${id} has been updated`);
});

// router.get("/:id", (req, res) => {
//     const { id } = req.params;

//     const foundUser = users.find((user) => user.id === id);

//     res.send(foundUser);
// });

router.delete("/:id", (req, res) => {
    const { id } = req.params;

    users = users.filter((user) => user.id !== id);

    res.send(`${id} deleted successfully from database`);
});

export default router;
