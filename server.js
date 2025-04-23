const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const db = require("./config/connection"); // No need to call mongoose.connect here

// Initialize the app
const app = express();

// Middleware to parse incoming requests
app.use(express.urlencoded({ extended: true })); // For form submissions
app.use(express.json()); // For parsing JSON bodies

// API routes
app.use("/api", routes);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});
