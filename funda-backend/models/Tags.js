const mongoose = require("mongoose");
const tagSchema = mongoose.Schema(
  {
    tagName: {
      type: String,
      required: "Tag Name is required",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    updatedAt: {
      type: Date,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
const Tags = mongoose.model("Tags", tagSchema);
module.exports = Tags;
