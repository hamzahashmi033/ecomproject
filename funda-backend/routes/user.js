const express = require("express");
const User = require("../controllers/user");

const router = express.Router();

router.get("/", User.show);

router.get("/showallsellers", User.showAllSeller);

router.get("/showallusers", User.showAllUser);

router.get("/adminDetails", User.adminDetails);

router.get("/:id", User.showById);

router.patch("/update/:id", User.update);

router.delete("/:id", User.deactive);

router.patch("/activateuser/:id", User.activate);

router.post("/dectivateuser/:id", User.deactive);

// router.post("/activate/:userId", User.activate);

router.get("/sellerDetails/:sellerID", User.sellerDetails);

router.post("/add-seller", User.addSeller);

module.exports = router;
