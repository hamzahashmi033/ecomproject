//general authentication middlewere
const authorization = require("../config/Authantication");
const express = require("express");
const {
  createBrand,
  getBrand,
  removeBrand,
  updateBrand,
} = require("../controllers/brand");
const router = express.Router();
router.post("/createbrand", createBrand);
router.get("/", getBrand);
router.delete("/:id", removeBrand);
router.patch("/:id", updateBrand);
module.exports = router;
