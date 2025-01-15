// const mongoose = require("mongoose");

// const scoreSchema = new mongoose.Schema({
//   name: { type: String, require: true },
//   score: { type: Number, require: true },
//   creation_date: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model("Score", scoreSchema);

module.exports = {
  create: async (db, data) => {
    const [result] = await db.query(
      "INSERT INTO scores (name, score, creation_date) VALUES (?, ?, ?)",
      [data.name, data.score, new Date()] // Добавляем текущую дату
    );
    return { id: result.insertId, ...data, creation_date: new Date() };
  },
  getLeaders: async (db) => {
    const [rows] = await db.query(
      "SELECT * FROM scores ORDER BY score DESC, creation_date ASC LIMIT 10" // Сортируем по score и creation_date
    );
    return rows;
  },
};
