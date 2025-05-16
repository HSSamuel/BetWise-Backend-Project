const express = require("express");
const { auth } = require("../middleware/authMiddleware");
const { placeBet, getUserBets } = require("../controllers/betController");

const router = express.Router();

// Get all bets for a user with game result
router.get("/", auth, getUserBets);

// Place a new bet (authenticated users only)
router.post("/", auth, placeBet);

module.exports = router;
