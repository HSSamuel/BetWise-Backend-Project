const express = require("express");
const router = express.Router();
const { auth, isAdmin } = require("../middleware/authMiddleware");
const { getStats } = require("../controllers/adminController");

// Admin only stats route
router.get("/stats", auth, isAdmin, getStats);

module.exports = router;
