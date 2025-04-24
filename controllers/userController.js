const { User, Thought } = require("../models");

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find().select("-__v");
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: "Failed to retrieve users", error: err });
    }
  },

  // Get single user by ID with thoughts and friends populated
  async getSingleUser(req, res) {
    try {
      const user = await User.findById(req.params.userId)
        .populate("thoughts")
        .populate("friends")
        .select("-__v");

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json({ message: "Error retrieving user", error: err });
    }
  },

  // Create new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.status(201).json(user);
    } catch (err) {
      res.status(400).json({ message: "Error creating user", error: err });
    }
  },

  // Update user info
  async updateUser(req, res) {
    try {
      const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
        new: true,
        runValidators: true,
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(user);
    } catch (err) {
      res.status(400).json({ message: "Error updating user", error: err });
    }
  },

  // Delete user and their thoughts
  async deleteUser(req, res) {
    try {
      const user = await User.findByIdAndDelete(req.params.userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Delete user's thoughts
      await Thought.deleteMany({ _id: { $in: user.thoughts } });

      res.json({ message: "User and their thoughts deleted" });
    } catch (err) {
      res.status(500).json({ message: "Error deleting user", error: err });
    }
  },

  // Add friend
  async addFriend(req, res) {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ message: "Friend added", user });
    } catch (err) {
      res.status(500).json({ message: "Error adding friend", error: err });
    }
  },

  // Remove friend
  async removeFriend(req, res) {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ message: "Friend removed", user });
    } catch (err) {
      res.status(500).json({ message: "Error removing friend", error: err });
    }
  },
};
