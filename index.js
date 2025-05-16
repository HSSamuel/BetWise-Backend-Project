const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/auth", require("./routes/authRoutes"));
app.use("/games", require("./routes/gameRoutes"));
app.use("/bets", require("./routes/betRoutes"));
app.use("/wallet", require("./routes/walletRoutes"));
app.use("/admin", require("./routes/adminRoutes"));

// Start server after DB connects
const startServer = async () => {
  await connectDB();
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
};

startServer();
// This code sets up an Express server that connects to a MongoDB database using Mongoose. It uses environment variables for configuration and includes middleware for parsing JSON requests. The server listens on a specified port and includes routes for authentication, games, bets, and wallet management. The server starts only after successfully connecting to the database.