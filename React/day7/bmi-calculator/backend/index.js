import express from "express";
import cors from "cors";
const app = express();
const port = 3008;

import pkg from "pg";
const { Pool } = pkg;

app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "bmi_calculator",
    password: "Prakhar123@",
    port: 5432,
});

// get all users
app.get("/bmi", (request, response) => {
    pool.query(
        "SELECT * FROM public.bmi_records ORDER BY id ASC",
        (error, results) => {
            if (error) {
                response.send({
                    status: false,
                    message: error.message,
                    data: [],
                });
            } else {
                response.send({
                    status: true,
                    message: "Records successfully fetched",
                    data: results.rows,
                });
            }
        }
    );
});

// get user by name
app.get("/bmi/:name", (request, response) => {
    const { name } = request.params;
    pool.query(
        "SELECT * FROM public.bmi_records WHERE name = $1 ORDER BY id DESC",
        [name.toLowerCase()],
        (error, results) => {
            if (error) {
                response.send({
                    status: false,
                    message: error.message,
                    data: [],
                });
            } else {
                response.send({
                    status: true,
                    message: `Records of ${name} successfully fetched`,
                    data: results.rows,
                });
            }
        }
    );
});

// calculate bmi
app.post("/bmi/calculated", (request, response) => {
    const { name, age, gender, height_cm, weight_kg } = request.body;

    const height_m = height_cm / 100;

    const bmi_calculated = weight_kg / (height_m * height_m);

    let category;
    if (bmi_calculated < 18.5) category = "underweight";
    if (bmi_calculated >= 18.5 && bmi_calculated < 25) category = "healthy";
    if (bmi_calculated >= 25 && bmi_calculated < 30) category = "overweight";
    if (bmi_calculated >= 30) category = "obese";

    pool.query(
        "INSERT INTO public.bmi_records (name, age, gender, height_cm, weight_kg, bmi, category) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
        [
            name.toLowerCase(),
            age,
            gender,
            height_cm,
            weight_kg,
            bmi_calculated.toFixed(2),
            category,
        ],
        (error, results) => {
            if (error) {
                response.send({
                    status: false,
                    message: error.message,
                    data: [],
                });
            } else {
                response.send({
                    status: true,
                    message: `New record ${results.rows[0].name} added successfully`,
                    data: results.rows,
                });
            }
        }
    );
});

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});
