const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Pool } = require("pg");
const cloudinary = require("./middleware/cloudinary");

const verifyToken = require("./middleware/auth");
const app = express();
require("dotenv").config();
const secret_key = process.env.SECRET_KEY;

const PORT = 3008;

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.text({ limit: "50mb" }));

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

app.get("/countries", verifyToken, (req, res) => {
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

app.get("/states", verifyToken, (req, res) => {
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

app.get("/cities", verifyToken, (req, res) => {
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
    const { name, age, gender, country_id, state_id, city_id, address, image } =
        req.body;
    const { username, email } = req.user;

    const uploadedImage = await cloudinary.uploader.upload(image, {
        upload_preset: "unsigned_upload",
        public_id: `${username}avatar`,
        allowed_formats: ["png", "jpeg", "jpg"],
    });

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
        console.log(userId);
        const existing = await pool.query(
            "SELECT * FROM user_profiles WHERE user_id = $1",
            [userId]
        );
        console.log(existing);
        if (existing.rows.length > 0) {
            pool.query(
                `UPDATE user_profiles SET
                 name = $1, age = $2, gender = $3, country_id = $4,
                 state_id = $5, city_id = $6, address = $7, image = $8 WHERE user_id = $9`,
                [
                    name,
                    age,
                    gender,
                    country_id,
                    state_id,
                    city_id,
                    address,
                    uploadedImage.secure_url,
                    userId,
                ],
                (error, results) => {
                    if (error) {
                        res.send({
                            status: false,
                            message: error.message,
                            data: [],
                        });
                    } else {
                        console.log(results);
                        res.send({
                            status: true,
                            message: "Profile updated successfully",
                            data: results.rows,
                        });
                    }
                }
            );
        } else {
            pool.query(
                `INSERT INTO user_profiles
                 (user_id, name, age, gender, country_id, state_id, city_id, address, image)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
                [
                    userId,
                    name,
                    age,
                    gender,
                    country_id,
                    state_id,
                    city_id,
                    address,
                    uploadedImage.secure_url,
                ],
                (error, results) => {
                    if (error) {
                        res.send({
                            status: false,
                            message: error.message,
                            data: [],
                        });
                    } else {
                        res.send({
                            status: true,
                            message: "Profile saved successfully",
                            data: results.rows,
                        });
                    }
                }
            );
        }
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
                p.name, p.age, p.gender, p.address, p.image,
                (SELECT name FROM countries WHERE id = p.country_id) AS country,
                (SELECT name FROM states WHERE id = p.state_id) AS state,
                (SELECT name FROM cities WHERE id = p.city_id) AS city
            FROM user_profiles p
            LEFT JOIN users u ON u.id = p.user_id
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
