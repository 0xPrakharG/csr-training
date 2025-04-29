const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const verifyToken = require("./middleLayer/auth");
const app = express();
require("dotenv").config();
const secret_key = process.env.SECRET_KEY;

const PORT = 3008;

app.use(cors());
app.use(express.json());

app.post("/sign", (req, res) => {
    const { username, password } = req.body;
    const token = jwt.sign({ username, password }, secret_key, {
        expiresIn: "2h",
    });
    try {
        if (token) {
            res.send({
                status: true,
                message: "User Logged In",
                data: [{ user: username, password: password, auth: token }],
            });
        } else {
            res.send("Ran into a error at post");
        }
    } catch (error) {
        res.send({ status: false, message: error.message, data: [] });
    }
});

app.get("/sign", verifyToken, (req, res) => {
    res.json({
        status: true,
        message: "User Verified",
        data: [
            {
                user: req.user.username,
                password: req.user.password,
            },
        ],
    });
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}.`);
});
