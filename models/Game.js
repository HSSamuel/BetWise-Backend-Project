const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  teamA: String,
  teamB: String,
  oddsA: Number,
  oddsB: Number,
  drawOdds: Number,
  result: { type: String, enum: ["A", "B", "Draw"], default: null },
});

module.exports = mongoose.model("Game", gameSchema);
