const mongoose = require("mongoose");

// MongoDB connection string
const connectionString =
  "mongodb+srv://A3rb3ar:Aerbear2004!@bookquest-cluster.ctqb03h.mongodb.net/socialNetworkDB?retryWrites=true&w=majority&appName=bookquest-cluster";

// Connect to MongoDB
mongoose
  .connect(connectionString)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

module.exports = mongoose.connection;
