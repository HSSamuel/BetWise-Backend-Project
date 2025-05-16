const User = require("../models/User");
const Bet = require("../models/Bet");
const Game = require("../models/Game");

const getStats = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const betCount = await Bet.countDocuments();
    const gameCount = await Game.countDocuments();

    res.status(200).json({
      users: userCount,
      bets: betCount,
      games: gameCount,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  getStats,
};
