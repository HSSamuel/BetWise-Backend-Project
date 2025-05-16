const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/authMiddleware"); // Adjust path if needed
const walletController = require("../controllers/walletController");

router.get("/", auth, walletController.getWallet); // GET /wallet
router.post("/topup", auth, walletController.topUpWallet); // POST /wallet/topup

module.exports = router;
// This code sets up a router for wallet-related routes in an Express application. It imports the necessary modules and middleware, defines two routes for getting wallet information and topping up the wallet, and exports the router for use in the main application. The routes are protected by authentication middleware to ensure that only authenticated users can access them.