//general authentication middleware
const authorization = require("../config/Authantication");
const express = require("express");
const wishListController = require("../controllers/wishlist");
const router = express.Router();

router.get("/getwishproduct/:user", wishListController.GetWishListProduct);
router.get("/getallwish", wishListController.getProduct);
router.post("/addwish", wishListController.postProduct);
router.delete(
  "/removeproductwish/:userId",
  wishListController.removeProductFromWish
);
router.delete("/deletewish/:wishID", wishListController.deleteSingleWishList);

router.post("/addproductlogin", wishListController.addProductAfterLogin);
router.get("/wishlistofuser/:userID", wishListController.getByUser);
router.post("/save/:userID", wishListController.saveWishList);

module.exports = router;
