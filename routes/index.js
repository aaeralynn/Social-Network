const router = require("express").Router();
const userRoutes = require("./api/userRoutes");
const thoughtRoutes = require("./api/thoughtRoutes"); // Thought routes import

router.use("/users", userRoutes); // User routes will be prefixed with /users
router.use("/thoughts", thoughtRoutes); // Thought routes will be prefixed with /thoughts

module.exports = router;
