const router = require("express").Router();
const userRoutes = require("./api/userRoutes");
const thoughtRoutes = require("./api/thoughtRoutes");

// Prefix all API routes with /api
router.use("/api/users", userRoutes);
router.use("/api/thoughts", thoughtRoutes);

module.exports = router;
