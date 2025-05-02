const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Pool } = require("pg");

const verifyToken = require("./middleLayer/auth");
const app = express();
require("dotenv").config();
const secret_key = process.env.SECRET_KEY;

const PORT = 3008;

app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "login-apis",
    password: "Prakhar123@",
    port: 5432,
});

app.post("/sign", async (req, res) => {
    const { username, password, email } = req.body;

    try {
        const userCheck = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if (userCheck.rows.length > 0) {
            const user = userCheck.rows[0];
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.send({
                    status: false,
                    message: "Invalid password",
                    data: [],
                });
            }

            const token = jwt.sign({ username, email }, secret_key, {
                expiresIn: "2h",
            });

            return res.send({
                status: true,
                message: "User Logged In",
                data: [{ username: username, email: user.email, auth: token }],
            });
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);

            await pool.query(
                "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)",
                [username, email, hashedPassword]
            );

            const token = jwt.sign({ username, email }, secret_key, {
                expiresIn: "2h",
            });

            return res.send({
                status: true,
                message: "User registered and added to the database",
                data: [{ username: username, email: email, auth: token }],
            });
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
