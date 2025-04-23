const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const reactionSchema = require("./Reaction"); // Import reaction schema

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema], // Array of reaction subdocuments
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const Thought = mongoose.model("Thought", thoughtSchema);

module.exports = Thought;
