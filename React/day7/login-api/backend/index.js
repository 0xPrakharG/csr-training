const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();

const key = "myjwttoken";

const PORT = 3008;

app.use(cors());
app.use(express.json());

app.post("/sign", (req, res) => {
    const { username, password } = req.body;
    const token = jwt.sign({ username, password }, key, {
        expiresIn: "2h",
    });
    res.send({ user: username, password: password, auth: token });
});

app.get("/sign", (req, res) => {
    console.log(req);
    res.send({ user: "Prakhargoyal" });
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}.`);
});
