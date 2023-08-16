const Product = require("../models/Product");
const Order = require("../models/order");
// @Method: POST
// @Route : api/product/createProduct
// @Desc  : Handling the creation of product

exports.createProduct = async (req, res, next) => {
  try {
    const {
      brandId,
      productName,
      productPrice,
      file,
      productTags,
      productDescription,
      productQuantity,
      productSubCategory,
      createdBy,
      otherDetails,
      specification,
      warranty,
    } = req.body;
    if (
      !productName ||
      !productPrice ||
      !productDescription ||
      !productQuantity ||
      // !productSubCategory ||
      !createdBy ||
      !specification ||
      !otherDetails ||
      !warranty.number ||
      !warranty.description
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter all the fields." });
    }

    // let product = await Product.findOne({ productName });
    // if (product) {
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "Product already exists" });
    // }
    const product = await Product.create({
      brandId: brandId,
      productName: productName,
      productPrice: productPrice,
      productTags: productTags,
      productImage: file,
      productDescription: productDescription,
      productQuantity: productQuantity,
      productSubCategory: productSubCategory,
      createdBy: createdBy,
      otherDetails: otherDetails,
      specification,
      warranty,
    });
    return res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @Method: GET
// @Route : api/product/
// @Desc  : Get all products
exports.getProduct = async (req, res) => {
  try {
    const products = await Product.find({ status: true }).populate("createdBy");
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @Method: GET
// @Route : api/product/:id
// @Desc  : Get product by id
exports.getProductById = async (req, res) => {
  let id = req.params.id;
  if (!id) {
    return res.status(422).json({
      message: "all feilds are required",
    });
  }
  try {
    const product = await Product.findOne({ _id: id, status: true }).populate(
      "createdBy"
    );
    if (!product) {
      return res.status(400).json({
        message: "invalid credentials",
      });
    }
    return res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductByTagId = async (req, res, next) => {
  const { tagName } = req.body;

  if (!tagName) {
    return res.status(400).json({
      message: "Tag Name Is Required",
    });
  }
  try {
    const product = await Product.find({ productTags: { $all: [tagName] } });
    // console.log(product);
    if (product.length < 1) {
      return res.status(200).json({
        message: "product is not available",
        product: [],
      });
    }
    return res.status(200).json({
      product,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

exports.removeProduct = async (req, res) => {
  let id = req.params.id;
  if (!id) {
    return res.status(422).json({
      message: "feilds are required",
    });
  }
  try {
    const removedProduct = await Product.remove({ _id: id });
    res
      .status(200)
      .json({ success: true, message: "Product deleted succesfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @Method: PATCH
// @Route : api/product/:id
// @Desc  : Handling the updation of product
exports.updateProduct = async (req, res, next) => {
  let id = req.params.id;
  try {
    const {
      brandId,
      productName,
      productPrice,
      productDescription,
      productQuantity,
      productTags,
      productSubCategory,
      otherDetails,
      productImage,
      warranty,
    } = req.body;

    if (
      !id ||
      !productName ||
      !productPrice ||
      !productDescription ||
      !productQuantity ||
      !productTags ||
      // !productSubCategory ||
      !productImage ||
      !otherDetails
    ) {
      return res.status(422).json({
        message: "All Feild Should Require",
      });
    }

    const updatedProduct = await Product.updateOne(
      { _id: id },
      {
        $set: {
          brandId: brandId,
          productName: productName,
          productPrice: productPrice,
          productImage: productImage,
          productTags: productTags,
          productDescription: productDescription,
          productQuantity: productQuantity,
          productSubCategory: productSubCategory,
          otherDetails,
          warranty,
        },
      }
    );

    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(500).json({
      msg: "server side",
      message: error.message,
    });
  }
};

// @Method: GET
// @Route : api/product/:productSubcategoryId
// @Desc  : Get product  by SubCategoryid
exports.getProductBySubCategoryId = async (req, res) => {
  let id = req.params.id;
  if (!id) {
    return res.status(422).json({
      message: "feilds are required",
    });
  }
  try {
    const product = await Product.find({ productSubCategory: id });
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductsByCreatedBy = async (req, res) => {
  let id = req.params.id;
  if (!id) {
    return res.status(422).json({
      message: "feilds are required",
    });
  }
  try {
    const product = await Product.find({ createdBy: id });
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.postReview = async (req, res, next) => {
  const id = req.params.prodID;
  const { Review, userId } = req.body;

  if (!Review || !userId || !id) {
    return res.status(422).json({
      message: "All feilds are required",
    });
  }
  try {
    let match;
    const checkReview = await Product.findOne({ _id: id });

    match = checkReview.review.find((check) => {
      return check.createdBy == userId;
    });

    if (match) {
      return res.status(400).json({
        message: "You already review this product",
      });
    }

    const order = await Order.find({ userId: userId });

    let isMatch = [];
    let notMatch = [];
    for (let i = 0; i < order.length; i++) {
      order[i].items.map((checkProductId) => {
        if (checkProductId.productId == id) {
          isMatch.push(checkProductId);
        } else {
          notMatch.push(checkProductId);
        }
      });
    }

    if (isMatch.length > 0) {
      const product = await Product.findOne({ _id: id });

      product.review.push(Review);
      await product.save();

      let total = 0;
      for (i = 0; i < product.review.length; i++) {
        total = total + product.review[i].numberOfStars;
      }
      let avgRating = total / product.review.length;
      product.averageRating = avgRating;
      await product.save();
      return res.status(201).json({
        message: "review added sucessfully",
        product,
      });
    } else {
      return res.status(400).json({
        message: "You can not post review",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "server side error",
      error: err.message,
    });
  }
};
