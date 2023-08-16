const express = require("express");
const router = express.Router();

const authorization = require("../config/Authantication");

const prodController = require("../controllers/product");

//upload multiple images

const {
  createProduct,
  getProduct,
  getProductById,
  removeProduct,
  updateProduct,
  getProductBySubCategoryId,
  getProductsByCreatedBy,
  deactive,
} = require("../controllers/product");
//createProduct
router.post("/createProduct", createProduct);
router.get("/", getProduct);
router.get("/:id", getProductById);
router.post("/tag", prodController.getProductByTagId);
router.delete("/remove/:id", removeProduct);
router.get("/getProductsByCreatedBy/:id", getProductsByCreatedBy);
router.patch("/update/:id", updateProduct);
router.get("/getProductBySubCategoryId/:id", getProductBySubCategoryId);

router.post("/postReview/:prodID", prodController.postReview);

module.exports = router;
