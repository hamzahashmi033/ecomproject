const express = require("express");
const blogController = require("../controllers/blog");
const router = express.Router();

router.post("/add/:id", blogController.addBlog);
router.get("/getall", blogController.getAll);
router.get("/getsingle/:id", blogController.getSingleBlog);
router.delete("/removeblog/:id", blogController.deleteBlog);

module.exports = router;
