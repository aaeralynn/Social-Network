const router = require("express").Router();
const {
  createThought,
  getThoughtById,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require("../../controllers/thoughtController");

// Route: /api/thoughts
router.route("/").post(createThought); // Create thought

// Route: /api/thoughts/:thoughtId
router
  .route("/:thoughtId")
  .get(getThoughtById) // Get thought by ID
  .put(updateThought) // Update thought by ID
  .delete(deleteThought); // Delete thought by ID

// Route: /api/thoughts/:thoughtId/reactions/:reactionId
router
  .route("/:thoughtId/reactions/:reactionId")
  .post(addReaction) // Add reaction
  .delete(removeReaction); // Remove reaction

module.exports = router;
