const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth"); // your auth middleware
const userController = require("../controllers/userController");
const { auth, isAdmin } = require("../middleware/authMiddleware");

// Protected user route
router.get("/profile", auth, (req, res) => {
  res.json({ user: req.user });
});

// Admin-only route
router.post("/admin/create-game", auth, isAdmin, (req, res) => {
  // Your createGameHandler logic here
  res.send("Admin game creation endpoint");
});

// Change email
router.patch("/email", auth, userController.changeEmail);

// Change password
router.patch("/password", auth, userController.changePassword);

module.exports = router;
