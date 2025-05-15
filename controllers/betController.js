const Bet = require("../models/Bet");
const Game = require("../models/Game");
const User = require("../models/User");

exports.placeBet = async (req, res) => {
  const { gameId, outcome, stake } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    if (user.walletBalance < stake) {
      return res.status(400).json({ msg: "Insufficient funds" });
    }

    const game = await Game.findById(gameId);
    if (!game || game.result) {
      return res.status(400).json({ msg: "Invalid or completed game" });
    }

    // Deduct stake
    user.walletBalance -= stake;
    await user.save();

    const bet = new Bet({
      user: userId,
      game: gameId,
      outcome,
      stake,
    });

    await bet.save();
    res.status(201).json(bet);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

exports.getUserBets = async (req, res) => {
  try {
    const bets = await Bet.find({ user: req.user.id }).populate("game");
    res.json(bets);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

exports.resolveBets = async (game) => {
  const bets = await Bet.find({ game: game._id }).populate("user");

  for (let bet of bets) {
    if (bet.status !== "pending") continue;

    let payout = 0;
    let won = false;

    if (bet.outcome === game.result) {
      if (game.result === "A") payout = bet.stake * game.oddsA;
      if (game.result === "B") payout = bet.stake * game.oddsB;
      if (game.result === "Draw") payout = bet.stake * game.drawOdds;

      won = true;
    }

    bet.payout = payout;
    bet.status = won ? "won" : "lost";
    await bet.save();

    if (won) {
      bet.user.walletBalance += payout;
      await bet.user.save();
    }
  }
};
