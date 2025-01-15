// const express = require("express");
// const Score = require("../models/Score");
// const router = express.Router();

// router.get("/", async (req, res) => {
//   try {
//     const leaders = await Score.find().sort({ score: 1 }).limit(10);
//     res.status(200).json(leaders);
//   } catch (error) {
//     console.error("Error fetching leader board: ", error.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// router.post("/", async (req, res) => {
//   try {
//     const { name, score } = req.body;

//     if (!name) {
//       return res.status(400).json({ error: "Name is required" });
//     } else if (!score) {
//       return res.status(400).json({ error: "Score is required" });
//     }

//     const newScore = new Score({ name, score });
//     await newScore.save();

//     res.status(200).json(newScore);
//   } catch (error) {
//     console.error("Error adding new result: ", error.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// module.exports = router;

const express = require("express");
const db = require("../config/db");
const Score = require("../models/Score");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const leaders = await Score.getLeaders(db);
    res.status(200).json(leaders);
  } catch (error) {
    console.error("Error fetching leader board: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, score } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    } else if (!score) {
      return res.status(400).json({ error: "Score is required" });
    }

    const newScore = await Score.create(db, { name, score });
    res.status(200).json(newScore);
  } catch (error) {
    console.error("Error adding new result: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
