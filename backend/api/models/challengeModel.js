const mongoose = require("mongoose");

const challengeSchema = mongoose.Schema(
  {
    creator: {
      type: String,
      required: true,
      default: "Anonymous",
    },
    name: {
      type: String,
      required: [true, "Please enter a name for your challenge"],
    },
    description: {
      type: String,
    },
    words: [
      {
        type: String,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Challenge = mongoose.model("Challenge", challengeSchema);

module.exports = Challenge;
