const express = require("express");
const router = express.Router();
const { upload } = require("../config/upload");
const uploadController = require("../controllers/upload");

router.post("/single", upload.single("image"), uploadController.uploadSingle);

router.post(
  "/multiple",
  upload.array("images"),
  uploadController.uploadMultiple
);

router.post("/delete", uploadController.delete);

module.exports = router;
