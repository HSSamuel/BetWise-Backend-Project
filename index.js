const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use("/auth", require("./routes/authRoutes"));
app.use("/games", require("./routes/gameRoutes"));
app.use("/bets", require("./routes/betRoutes"));
app.use("/wallet", require("./routes/walletRoutes"));

const PORT = process.env.PORT || 5000;

// Wait for MongoDB connection before starting the server
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});