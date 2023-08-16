const Blog = require("../models/blog");
const User = require("../models/User");

exports.addBlog = async (req, res, next) => { 
  const adminId = req.params.id;
  const { title, image, description, catagory } = req.body;
  if (!title || !image || !description || !catagory) {
    return res.status(422).json({
      message: "All feilds are required",
    });
  }
  try {
    const user = await User.findOne({ _id: adminId });
    if (!user) {
      return res.status(422).json({
        message: "user not found",
      });
    }
    if (user.role !== "admin") {
      return res.status(422).json({
        message: "Only Admin Can Post Blog",
      });
    }
    const blog = new Blog({
      title,
      image,
      description,
      created_by: adminId,
      catagory,
    });
    await blog.save();
    return res.status(201).json({
      message: "Blog Posted",
    });
  } catch (err) {
   
    res.status(500).json({
      error: err.message,
    });
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const blog = await Blog.find();
    if (blog.length < 1) {
      return res.status(422).json({
        message: "No blog is available",
        blog,
      });
    } else {
      return res.status(200).json({
        blog,
      });
    }
  } catch (err) {
  
    return res.status().json({
      message: err.message,
    });
  }
};
exports.getSingleBlog = async (req, res, next) => {
  const id = req.params.id;
  try {
    const blog = await Blog.findOne({ _id: id });
    if (!blog) {
      return res.status(400).json({
        message: "Blog not found",
      });
    }
    return res.status(200).json({
      message: "get single blog",
      blog,
    });
  } catch (err) {
    return res.status(500).json();
  }
};

exports.deleteBlog = async (req, res, next) => {
  const blogId = req.params.id;
  try {
    const Remove = await Blog.deleteOne({ _id: blogId });
    res.status(202).json({
      message: "remove sucessfully",
      Remove,
    });
  } catch (err) {

    res.status().json({
      message: err.message,
    });
  }
};
