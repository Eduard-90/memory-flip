// const mongoose = require("mongoose");
// require("dotenv").config();

// const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/game";

// mongoose.set("debug", true);

// mongoose
//   .connect(mongoURI)
//   .then(() => {
//     console.log("MongoDB Connected!");
//   })
//   .catch((err) => {
//     console.error("MongoDB Connecting error:", err);
//   });

// module.exports = mongoose;

const mysql = require("mysql2/promise");
require("dotenv").config();

const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_NAME || "memory-flip",
});

db.getConnection()
  .then(() => console.log("MySQL Connected!"))
  .catch((err) => console.error("MySQL Connecting error:", err));

module.exports = db;
