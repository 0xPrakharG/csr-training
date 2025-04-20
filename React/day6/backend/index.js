import express from "express";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";
const app = express();

const port = 3008;
app.use(express.json());
app.use(cors());
// app.use(
//     cors({
//         origin: "http://localhost:3000",
//         methods: ["GET", "POST", "PUT", "DELETE"],
//         allowedHeaders: ["Content-Type"],
//     })
// );

let users = [];

app.get("/users", (req, res) => {
    res.send(users);
});

app.post("/users", (req, res) => {
    const user = req.body;
    const newUser = { ...user, id: uuidv4() };
    user && users.push(newUser);
    res.send(users);
});

app.put("/users/:id", (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
        return res.status(404).json({ error: "User not found" });
    }

    users[userIndex] = {
        ...users[userIndex],
        ...updatedData,
    };
    res.status(200).json(users[userIndex]);
});

app.delete("/users/:id", (req, res) => {
    const { id } = req.params;
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
        return res.status(404).json({ error: "User not found" });
    }
    const deletedUser = users[userIndex];
    users.splice(userIndex, 1);
    
    res.status(200).json({
        deletedUser,
    });
});

app.listen(port, () =>
    console.log(`Server running on port: http://localhost:${port}`)
);
