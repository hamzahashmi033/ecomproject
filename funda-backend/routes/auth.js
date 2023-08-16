const express = require("express");
const Auth = require("../controllers/auth");

const router = express.Router();

router.post("/register", Auth.register);
router.get("/verifytoken/:token", Auth.verifyToken);
router.post("/login", Auth.login);
router.get("/:token", Auth.getLoggedInUser);
router.post("/forgetpassword", Auth.forgetPassword);
router.post("/reset/:token", Auth.resetPassword);
router.patch("/changepassword/:id", Auth.changePassword);
router.patch("/changeemail/:id", Auth.changeEmailAddress);
router.post("/login/social", Auth.socialLogin);
module.exports = router;
