const express = require("express");
const router = express.Router();
const {
  createGame,
  getGames,
  setResult,
} = require("../controllers/gameController");
const { auth, isAdmin } = require("../middlewares/authMiddleware");

// Admin only
router.post("/", auth, isAdmin, createGame);

// Public - View games
router.get("/", getGames);

// Admin - Set result
router.patch("/:id/result", auth, isAdmin, setResult);

module.exports = router;
// This code defines the routes for managing games in a betting application.