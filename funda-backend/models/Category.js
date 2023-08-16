const mongoose = require("mongoose");
const categorySchema = mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: "Category Name is required",
    },
    icon: {
      type: String,
      required: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      // required: [true, "Created by is required"],
      ref: "User",
    },
    updatedAt: {
      type: Date,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);
const Cateogry = mongoose.model("Category", categorySchema);
module.exports = Cateogry;
