//general authentication middleware
const authorization = require("../config/Authantication");
const express = require("express");
const router = express.Router();

const bannerController = require("../controllers/banner");

router.post("/add", bannerController.addBanner);
router.get("/get", bannerController.getBanner);
router.delete("/remove/:bannerID", bannerController.deleteBanner);
router.patch("/update/:BannerID", bannerController.updateBanner);

module.exports = router;
