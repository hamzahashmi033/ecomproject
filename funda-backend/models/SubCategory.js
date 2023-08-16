const mongoose = require("mongoose");
const subCategorySchema = mongoose.Schema(
  {
    subCategoryName: {
      type: String,
      required: "Sub Category Name is required",
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      required: "Category is required",
      ref: "Category",
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
  },
  { timestamps: true }
);
const SubCategory = mongoose.model("SubCategory", subCategorySchema);
module.exports = SubCategory;
