//general authentication middleware
const authorization = require("../config/Authantication");
const express = require("express");
const {
  createTag,
  getTag,
  removeTag,
  updateTag,
} = require("../controllers/tags");
const router = express.Router();
router.post("/createtag", createTag);
router.get("/", getTag);
router.delete("/:id", removeTag);
router.patch("/:id", updateTag);
module.exports = router;
