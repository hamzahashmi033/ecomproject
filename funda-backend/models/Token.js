const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    token: {
      type: String,
      required: true,
    },

    tokenCreatedAt: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tokens", tokenSchema);
