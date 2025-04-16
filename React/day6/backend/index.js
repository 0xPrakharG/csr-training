import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
const app = express();
import userRoutes from "./routes/users.js";

const port = 3008;
app.use(cors({ origin: "http://localhost:3000" }));
app.use(bodyParser.json());

app.use("/users", userRoutes);

app.listen(port, () =>
    console.log(`Server running on port: http://localhost:${port}`)
);
