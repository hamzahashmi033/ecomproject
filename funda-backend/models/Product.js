const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
  status: {
    type: Boolean,
    default: true,
  },
  brandId: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    default: null,
  },
  specification: {
    type: String,
  },
  productName: {
    type: String,
    required: [true, "Product name is required"],
  },
  productPrice: {
    type: String,
    required: [true, "Product price is required"],
  },
  productImage: {
    type: Array,
  },
  productDescription: {
    type: String,
    required: [true, "Product description is required"],
  },
  productQuantity: {
    type: Number,
    required: [true, "Product quantity is required"],
  },
  warranty: {
    number: { type: Number, required: true },
    description: { type: String, required: true },
  },
  productSubCategory: {
    type: mongoose.Schema.Types.ObjectId,
    // required: [false, "Product category is required"],
    required: false,
    ref: "SubCategory",
    default: null,
  },

  productTags: {
    type: Array,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },

  updatedAt: {
    type: Date,
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  salePercentDiscount: { type: Number, default: undefined },
  otherDetails: [
    {
      productKey: { type: String },
      productValue: [
        {
          attributeName: { type: String },
          attributePrice: { type: Number },
        },
      ],
    },
  ],
  review: [
    {
      userName: { type: String },
      createdBy: { type: mongoose.Schema.Types.ObjectId },
      comment: { type: String },
      numberOfStars: { type: Number },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  averageRating: { type: Number, default: "0" },
});
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
