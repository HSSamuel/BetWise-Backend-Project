const express = require("express");
const router = express.Router();
const { getWallet, topUpWallet } = require("../controllers/walletController");
const { auth } = require("../middlewares/authMiddleware");

router.get("/", auth, getWallet);
router.post("/topup", auth, topUpWallet);

module.exports = router;
// This route is for getting and topping up the user's wallet.
