const { User, Thought } = require("../models");

// Create a new thought
const createThought = async (req, res) => {
  try {
    const { thoughtText, username, userId } = req.body;

    const thought = await Thought.create({
      thoughtText,
      username,
    });

    // Add thought to user's thoughts array
    await User.findByIdAndUpdate(userId, {
      $push: { thoughts: thought._id },
    });

    res.status(201).json(thought);
  } catch (err) {
    res.status(500).json({ message: "Failed to create thought", error: err });
  }
};

// Get a single thought by its _id
const getThoughtById = async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId).lean();

    if (!thought) {
      return res.status(404).json({ message: "No thought found with that ID" });
    }

    res.status(200).json(thought);
  } catch (err) {
    res.status(500).json({ message: "Failed to get thought", error: err });
  }
};

// Update a thought by its _id
const updateThought = async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { thoughtText: req.body.thoughtText },
      { new: true, runValidators: true }
    );

    if (!thought) {
      return res.status(404).json({ message: "No thought found with that ID" });
    }

    res.status(200).json(thought);
  } catch (err) {
    res.status(500).json({ message: "Failed to update thought", error: err });
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
    await User.findOneAndUpdate(
      { thoughts: thought._id },
      { $pull: { thoughts: thought._id } }
    );

    res
      .status(200)
      .json({ message: "Thought and associated reactions deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete thought", error: err });
  }
};

// Add a reaction to a thought
const addReaction = async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $push: { reactions: req.body } },
      { new: true, runValidators: true }
    );

    if (!thought) {
      return res.status(404).json({ message: "No thought found with that ID" });
    }

    res.status(200).json(thought);
  } catch (err) {
    res.status(500).json({ message: "Failed to add reaction", error: err });
  }
};

// Remove a reaction from a thought
const removeReaction = async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    );

    if (!thought) {
      return res.status(404).json({ message: "No thought found with that ID" });
    }

    res.status(200).json(thought);
  } catch (err) {
    res.status(500).json({ message: "Failed to remove reaction", error: err });
  }
};

module.exports = {
  createThought,
  getThoughtById,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
};
