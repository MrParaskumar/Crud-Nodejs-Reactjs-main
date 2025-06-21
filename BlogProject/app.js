// app.js
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
require("dotenv").config();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to DB");
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});