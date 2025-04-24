const router = require("express").Router();
const {
  createThought,
  getThoughtById,
  updateThought,
  deleteThought,
} = require("../../controllers/thoughtController");

router
  .route("/")
  .post(createThought) // Create a new thought
  .get((req, res) =>
    res.send("GET all thoughts endpoint is not yet implemented")
  );

router
  .route("/:thoughtId")
  .get(getThoughtById) // Get a single thought by its _id
  .put(updateThought) // Update a thought by its _id
  .delete(deleteThought); // Delete a thought and its reactions

module.exports = router;
