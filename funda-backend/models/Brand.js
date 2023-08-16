const mongoose = require("mongoose");
const brandSchema = mongoose.Schema(
  {
    brandName: {
      type: String,
      required: "Brand Name is required",
    },
    brandImage: {
      type: String,
      required: "Brand Image is required",
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
const Brands = mongoose.model("Brands", brandSchema);
module.exports = Brands;
