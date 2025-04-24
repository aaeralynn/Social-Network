const express = require("express");
const db = require("./config/connection"); // Already connects via mongoose inside
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware for parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use API routes
app.use("/api", routes);

// Once MongoDB connects, then start the server
db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}`);
  });
});
