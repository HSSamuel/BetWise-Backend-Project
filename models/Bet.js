// models/Bet.js
const mongoose = require("mongoose");

const BetSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  game: { type: mongoose.Schema.Types.ObjectId, ref: "Game" },
  outcome: { type: String, enum: ["A", "B", "Draw"], required: true },
  stake: { type: Number, required: true },
  payout: { type: Number, default: 0 },
  status: {
    type: String,
    enum: ["pending", "won", "lost"],
    default: "pending",
  },
});

module.exports = mongoose.model("Bet", BetSchema);
