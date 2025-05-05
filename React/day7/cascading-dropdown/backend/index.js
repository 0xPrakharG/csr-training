const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Pool } = require("pg");

const verifyToken = require("./middleware/auth");
const app = express();
require("dotenv").config();
const secret_key = process.env.SECRET_KEY;

const PORT = 3008;

app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "cascading-dropdown",
    password: "Prakhar123@",
    port: 5432,
});

app.get("/sign", verifyToken, (req, res) => {
    res.json({
        status: true,
        message: "User Verified",
        data: [
            {
                email: req.user.email,
                user: req.user.username,
                password: req.user.password,
            },
        ],
    });
});

app.post("/sign", async (req, res) => {
    const { username, password, email } = req.body;

    try {
        const usernameCheck = await pool.query(
            "SELECT * FROM users WHERE username = $1",
            [username.toLowerCase()]
        );
        const emailCheck = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email.toLowerCase()]
        );

        if (usernameCheck.rows.length > 0 && emailCheck.rows.length > 0) {
            const user = usernameCheck.rows[0];

            if (user.email !== email.toLowerCase()) {
                res.send({
                    status: true,
                    message:
                        "Entered email do not have the same username as entered",
                });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.send({
                    status: false,
                    message: "Invalid password",
                    data: [],
                });
            }

            const token = jwt.sign({ username, email, password }, secret_key, {
                expiresIn: "2h",
            });

            return res.send({
                status: true,
                message: "User Logged In",
                data: [
                    {
                        username: username,
                        email: email,
                        auth: token,
                    },
                ],
            });
        } else if (
            usernameCheck.rows.length > 0 &&
            emailCheck.rows.length === 0
        ) {
            return res.send({
                status: false,
                message: "Username already in use",
                data: [],
            });
        } else if (
            usernameCheck.rows.length === 0 &&
            emailCheck.rows.length > 0
        ) {
            return res.send({
                status: false,
                message: "Email already in use",
                data: [],
            });
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);

            await pool.query(
                "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)",
                [username.toLowerCase(), email.toLowerCase(), hashedPassword]
            );

            const token = jwt.sign({ username, email, password }, secret_key, {
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

app.get("/countries", (req, res) => {
    pool.query("SELECT * FROM countries", (error, results) => {
        if (error) {
            res.send({
                status: false,
                message: "Error in fetching countries",
                data: [],
            });
        } else {
            res.send({
                status: true,
                message: "Countries fetched",
                data: [results.rows],
            });
        }
    });
});

app.get("/states", (req, res) => {
    const { country_id } = req.query;

    pool.query(
        "SELECT * FROM states where country_id= $1",
        [country_id],
        (error, results) => {
            if (error) {
                res.send({
                    status: false,
                    message: "Error in fetching states",
                    data: [],
                });
            } else {
                res.send({
                    status: true,
                    message: `States of the country with id=${country_id} fetched`,
                    data: [results.rows],
                });
            }
        }
    );
});

app.get("/cities", (req, res) => {
    const { state_id } = req.query;

    pool.query(
        "SELECT * FROM cities where state_id= $1",
        [state_id],
        (error, results) => {
            if (error) {
                res.send({
                    status: false,
                    message: "Error in fetching cities",
                    data: [],
                });
            } else {
                res.send({
                    status: true,
                    message: `States of the country with id=${state_id} fetched`,
                    data: [results.rows],
                });
            }
        }
    );
});

app.post("/saveProfileInfo", verifyToken, async (req, res) => {
    const { name, age, gender, country_id, state_id, city_id, address } =
        req.body;
    const { username, email } = req.user;

    try {
        const userRes = await pool.query(
            "SELECT id FROM users WHERE username=$1 AND email=$2",
            [username.toLowerCase(), email.toLowerCase()]
        );

        if (userRes.rows.length === 0) {
            return res.send({
                status: false,
                message: "User not found",
                data: [],
            });
        }

        const userId = userRes.rows[0].id;

        const existing = await pool.query(
            "SELECT * FROM user_profiles WHERE user_id = $1",
            [userId]
        );

        if (existing.rows.length > 0) {
            await pool.query(
                `UPDATE user_profiles SET
                 name = $1, age = $2, gender = $3, country_id = $4,
                 state_id = $5, city_id = $6, address = $7
                 WHERE user_id = $8`,
                [
                    name,
                    age,
                    gender,
                    country_id,
                    state_id,
                    city_id,
                    address,
                    userId,
                ]
            );
        } else {
            await pool.query(
                `INSERT INTO user_profiles
                 (user_id, name, age, gender, country_id, state_id, city_id, address)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
                [
                    userId,
                    name,
                    age,
                    gender,
                    country_id,
                    state_id,
                    city_id,
                    address,
                ]
            );
        }
        res.send({
            status: true,
            message: "Profile saved successfully",
            data: [
                {
                    name: name,
                    age: age,
                    gender: gender,
                    country_id: country_id,
                    state_id: state_id,
                    city_id: city_id,
                    address: address,
                },
            ],
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            status: false,
            message: error.message,
            data: [],
        });
    }
});

app.get("/getProfile", verifyToken, async (req, res) => {
    const { username, email } = req.user;

    try {
        const result = await pool.query(
            `SELECT
           u.username, u.email,
           p.name, p.age, p.gender, p.address,
           c.name AS country,
           s.name AS state,
           ci.name AS city
         FROM user_profiles p
         JOIN users u ON p.user_id = u.id
         JOIN countries c ON p.country_id = c.id
         JOIN states s ON p.state_id = s.id
         JOIN cities ci ON p.city_id = ci.id
         WHERE u.username = $1 AND u.email = $2`,
            [username.toLowerCase(), email.toLowerCase()]
        );

        if (result.rows.length === 0) {
            return res.status(404).send({
                status: false,
                message: "Profile not found",
                data: [],
            });
        }

        res.send({
            status: true,
            message: "Profile fetched successfully",
            data: result.rows[0],
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            status: false,
            message: error.message,
            data: [],
        });
    }
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}.`);
});
