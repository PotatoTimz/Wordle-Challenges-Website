const mongoose = require("mongoose");

const challengeSchema = mongoose.Schema(
  {
    creator: {
      type: String,
      required: true,
      minLength: [3, "Creator name must exceed 3 characters"],
      maxLength: [15, "Creator name must not exceed 15 characters"],
      default: "Anonymous",
    },
    name: {
      type: String,
      required: [true, "Please enter a name for your challenge"],
      minLength: [3, "Challenge name must exceed 3 characters"],
      maxLength: [25, "Challenge name must not exceed 25 characters"],
    },
    description: {
      type: String,
      maxLength: [280, "Description must not exceed 280 characters"],
    },
    words: [
      {
        type: String,
        required: true,
        minLength: [5, "Each word entered must be 5 characters long"],
        maxLength: [5, "Each word entered must be 5 characters long"],
        // validate: {
        //   validator: function (value) {
        //     return wordBank.includes(value.toLowerCase());
        //   },
        //   message: (props) => `${props.value} is not a valid word`,
        // },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Challenge = mongoose.model("Challenge", challengeSchema);

module.exports = Challenge;
