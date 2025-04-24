const { User, Thought } = require("../models");

// Get all thoughts
const getThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find().lean();
    res.status(200).json(thoughts);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to get thoughts", error: err.message });
  }
};

// Create a new thought
const createThought = async (req, res) => {
  try {
    const { thoughtText, username, userId } = req.body;

    console.log("Request body:", req.body);

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const thought = await Thought.create({
      thoughtText,
      username,
    }).catch((err) => {
      console.error("Mongoose validation error:", err);
      throw err;
    });

    await User.findByIdAndUpdate(userId, {
      $push: { thoughts: thought._id },
    });

    res.status(201).json(thought);
  } catch (err) {
    console.error("Error details:", err);
    res
      .status(500)
      .json({ message: "Failed to create thought", error: err.message });
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
    res
      .status(500)
      .json({ message: "Failed to get thought", error: err.message });
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
    res
      .status(500)
      .json({ message: "Failed to update thought", error: err.message });
  }
};

// Delete a thought by its _id
const deleteThought = async (req, res) => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.thoughtId);

    if (!thought) {
      return res.status(404).json({ message: "No thought found with that ID" });
    }

    await User.findOneAndUpdate(
      { thoughts: thought._id },
      { $pull: { thoughts: thought._id } }
    );

    res
      .status(200)
      .json({ message: "Thought and associated reactions deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete thought", error: err.message });
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
    res
      .status(500)
      .json({ message: "Failed to add reaction", error: err.message });
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
    res
      .status(500)
      .json({ message: "Failed to remove reaction", error: err.message });
  }
};

module.exports = {
  getThoughts, // ✅ ADDED EXPORT
  createThought,
  getThoughtById,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
};
