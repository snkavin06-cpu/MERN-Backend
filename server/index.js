const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("ELORA BACKEND CONNECTED SUCCESSFULLY!");
});

app.post("/api/auth/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        res.json({
            message: "Registration API working!"
        });

    } catch (error) {
        res.status(500).json({
            message: "Registration failed"
        });
    }
});

app.post("/api/auth/login", (req, res) => {
    res.json({
        message: "Login API working!"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});