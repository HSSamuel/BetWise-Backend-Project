// routes/betRoutes.js
const express = require("express");
const { auth } = require("../middlewares/authMiddleware");
const Bet = require("../models/Bet");
const Game = require("../models/Game");
const { placeBet, getUserBets } = require("../controllers/betController");

const router = express.Router();

// Get all bets for a user with game result
router.get("/", auth, async (req, res) => {
  router.post("/", auth, placeBet);
  router.get("/", auth, getUserBets);
  try {
    const bets = await Bet.find({ user: req.user.id }).populate(
      "game",
      "teamA teamB result"
    ); // show game & result
    res.json(bets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
