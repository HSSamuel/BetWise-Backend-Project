const User = require("../models/User");

exports.getWallet = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("walletBalance");
    if (!user) return res.status(404).json({ msg: "User not found" });

    res.json({ walletBalance: user.walletBalance });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

exports.topUpWallet = async (req, res) => {
  const { amount } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ msg: "Invalid top-up amount" });
  }

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    user.walletBalance += amount;
    await user.save();

    res.json({
      msg: "Wallet topped up successfully",
      walletBalance: user.walletBalance,
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
