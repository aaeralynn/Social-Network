const { User, Thought } = require("../models");

// Create a new thought
const createThought = async (req, res) => {
  try {
    const { thoughtText, username, userId } = req.body;

    // Create the new thought
    const thought = await Thought.create({
      thoughtText,
      username,
      userId,
    });

    // Add thought _id to the user's thoughts array
    await User.findByIdAndUpdate(userId, {
      $push: { thoughts: thought._id },
    });

    res.status(201).json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get a single thought by its _id
const getThoughtById = async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId)
      .populate("reactions") // Populate reactions array
      .lean();

    if (!thought) {
      return res.status(404).json({ message: "No thought found with that ID" });
    }

    res.status(200).json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Update a thought by its _id
const updateThought = async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { thoughtText: req.body.thoughtText },
      { new: true }
    );

    if (!thought) {
      return res.status(404).json({ message: "No thought found with that ID" });
    }

    res.status(200).json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Delete a thought by its _id
const deleteThought = async (req, res) => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.thoughtId);

    if (!thought) {
      return res.status(404).json({ message: "No thought found with that ID" });
    }

    // Remove thought from user's thoughts array
    await User.findByIdAndUpdate(thought.userId, {
      $pull: { thoughts: thought._id },
    });

    res
      .status(200)
      .json({ message: "Thought and associated reactions deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  createThought,
  getThoughtById,
  updateThought,
  deleteThought,
};
