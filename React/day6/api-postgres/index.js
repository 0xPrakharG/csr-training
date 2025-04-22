import express from "express";
import cors from "cors";
// const bodyParser = require("body-parser");
const app = express();
const port = 3008;

import pkg from "pg";
const { Pool } = pkg;

app.use(cors());
app.use(express.json());

// app.use(bodyParser.json());
// app.use(
//     bodyParser.urlencoded({
//         extended: true,
//     })
// );

// const Pool = require("pg").Pool;
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "api",
    password: "Prakhar123@",
    port: 5432,
});

app.get("/", (request, response) => {
    pool.query(
        "SELECT * FROM public.users_data ORDER BY id ASC",
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
                    message: "Users successfully fetched",
                    data: results.rows,
                });
            }
        }
    );
});

app.post("/", (request, response) => {
    const { firstname, lastname, maidenname, age, gender, email } =
        request.body;

    pool.query(
        "INSERT INTO public.users_data (firstname, lastname, maidenname, age, gender, email) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [firstname, lastname, maidenname, age, gender, email],
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
                    message: `New user ${results.rows[0].firstname} added successfully`,
                    data: results.rows,
                });
            }
        }
    );
});

app.put("/:id", (request, response) => {
    const id = parseInt(request.params.id);
    const { firstname, lastname, maidenname, age, gender, email } =
        request.body;

    pool.query(
        "UPDATE public.users_data SET firstname = $1, lastname = $2, maidenname = $3, age = $4, gender = $5, email = $6 WHERE id = $7 RETURNING *",
        [firstname, lastname, maidenname, age, gender, email, id],
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
                    message: `User ${results.rows[0].firstname} updated successfully`,
                    data: results.rows,
                });
            }
        }
    );
});

app.delete("/:id", (request, response) => {
    const id = parseInt(request.params.id);

    pool.query(
        "DELETE FROM public.users_data WHERE id = $1 RETURNING *",
        [id],
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
                    message: `User deleted with name: ${results.rows[0].firstname}`,
                    data: results.rows,
                });
            }
        }
    );
});

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});
