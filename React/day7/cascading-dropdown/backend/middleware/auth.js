const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret_key = process.env.SECRET_KEY;

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res
            .status(401)
            .json({ message: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1];
    try {
        const verified = jwt.verify(token, secret_key);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send({ message: "Invalid token" });
    }
};

module.exports = verifyToken;
