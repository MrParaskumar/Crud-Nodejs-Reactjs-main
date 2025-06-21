// controllers/authController.js
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.create({ name, email, password });
        res.json({ message: "User registered", user });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        const isMatch = user && (await bcrypt.compare(password, user.password));
        if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        res.json({ token });
    } catch {
        res.status(500).json({ error: "Login failed" });
    }
};

// forgot/reset password methods would use nodemailer + token-based reset
