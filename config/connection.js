const mongoose = require("mongoose");

// Load environment variables from .env file
require("dotenv").config();

// MongoDB connection string from .env file
const connectionString = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

module.exports = mongoose.connection;
