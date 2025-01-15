// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const mongoose = require("./config/db");
// const scoreRouter = require("./routes/Scores");

// const app = express();

// app.use(cors());
// app.use(bodyParser.json());

// app.use("/api/scores", scoreRouter);

// const PORT = process.env.PORT || 5002;
// app.listen(PORT, () => {
//   console.log(`App listening on port ${PORT}`);
// });

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2/promise");
require("dotenv").config();

const scoreRouter = require("./routes/Scores"); // Маршруты остаются

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Настройка подключения к MySQL
const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_NAME || "memory-flip",
};

// Проверка соединения с MySQL
async function testDBConnection() {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log("Connected to MySQL database!");
    await connection.end();
  } catch (error) {
    console.error("Error connecting to MySQL:", error);
  }
}
testDBConnection();

// Добавляем маршруты
app.use(
  "/api/scores",
  (req, res, next) => {
    req.dbConfig = dbConfig; // Передаем конфигурацию БД в маршруты
    next();
  },
  scoreRouter
);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
