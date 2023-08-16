//general authentication middleware
const authorization = require("../config/Authantication");
const express = require("express");
const {
  createSubCategory,
  getSubCategory,
  getSubCategoryById,
  removeSubCategory,
  updateSubCategory,
  getSubCategoryByCategoryId,
} = require("../controllers/subCategory");
const router = express.Router();
router.post("/createsubcategory", createSubCategory);
router.get("/", getSubCategory);
router.get("/:id", getSubCategoryById);
router.get("/getsubcategorybycategoryid/:id", getSubCategoryByCategoryId);
router.delete("/:id", removeSubCategory);
router.patch("/:id", updateSubCategory);
module.exports = router;
