//general authentication middleware
const authorization = require("../config/Authantication");

const express = require("express");
const {
  createCategory,
  getCategory,
  getCategoryById,
  removeCategory,
  updateCategory,
  getCategoryBySubCategoryId,
} = require("../controllers/category");
const router = express.Router();
router.post("/createCategory", createCategory);
router.get("/", getCategory);
router.get("/:id", getCategoryById);
router.delete("/:id", removeCategory);
router.patch("/:id", updateCategory);
router.get("/getCategoryBySubCategoryId/:id", getCategoryBySubCategoryId);
module.exports = router;
