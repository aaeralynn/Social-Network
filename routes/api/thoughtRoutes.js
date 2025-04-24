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
router
  .route("/")
  .post(createThought)
  .get((req, res) =>
    res.send("GET all thoughts endpoint is not yet implemented")
  );

// Route: /api/thoughts/:thoughtId
router
  .route("/:thoughtId")
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

// Route: /api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").post(addReaction);

// Route: /api/thoughts/:thoughtId/reactions/:reactionId
router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);

module.exports = router;
