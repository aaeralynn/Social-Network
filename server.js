const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Mount API routes
app.use("/api", routes);

// Catch-all for unknown routes
app.use((req, res) => {
  res.status(404).send(`🚫 No route found for ${req.method} ${req.url}`);
});

// Connect to DB and start server
db.once("open", () => {
  console.log("🟢 MongoDB connected successfully");
  app.listen(PORT, () => {
    console.log(`🚀 API server running on port ${PORT}`);
  });
});
