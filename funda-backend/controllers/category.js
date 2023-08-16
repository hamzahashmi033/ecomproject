const Category = require("../models/Category");
const SubCategory = require("../models/SubCategory");
// @Method: POST
// @Route : api/category/createCategory
// @Desc  : Handling the creation of category
exports.createCategory = async (req, res) => {
  try {
    const { categoryName, image, icon } = req.body;
    if (!categoryName || !image) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter Category name." });
    }
    let category = await Category.findOne({ categoryName });
    if (category) {
      return res
        .status(400)
        .json({ success: false, message: "Category already exists" });
    }
    category = await Category.create({ categoryName, image, icon });
    res.status(200).json({
      success: true,
      message: "Category Added Sucessfully",
      data: category,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// @Method: GET
// @Route : api/category/
// @Desc  : Get all categories
exports.getCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// @Method: GET
// @Route : api/category/:id
// @Desc  : Get category by id
exports.getCategoryById = async (req, res) => {
  let id = req.params.id;
  if (!id) {
    return res.status(422).json({
      message: "feilds are required",
    });
  }
  try {
    const category = await Category.findById(id);
    res.status(200).json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// @Method: DELETE
// @Route : api/category/:id
// @Desc  : Delete category by id
exports.removeCategory = async (req, res) => {
  try {
    let id = req.params.id;
    const removedCategory = await Category.remove({ _id: id });
    const removedSubCategory = await SubCategory.remove({ categoryId: id });
    res.status(200).json({
      success: true,
      message: "Category Deleted Successfully",
      data: removedCategory,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// @Method: PATCH
// @Route : api/category/:id
// @Desc  : Handling the updation of category
exports.updateCategory = async (req, res) => {
  console.log("req.body", req.body);
  console.log(req.params.id);
  let id = req.params.id;
  try {
    const { categoryName, image, icon } = req.body;
    if (!categoryName || !image || !id) {
      return res
        .status(400)
        .json({ success: false, message: "All Feilds Are Required." });
    }
    const updateCategory = await Category.findOne({ _id: id });
    if (!updateCategory) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }

    updateCategory.categoryName = categoryName;
    updateCategory.image = image;
    updateCategory.icon = icon;
    await updateCategory.save();

    // const updatedCategory = await Category.updateOne(
    //   { _id: id },
    //   { $set: { categoryName: categoryName, image: image, icon: icon } }
    // );
    res.status(200).json({
      success: true,
      message: "Category Updated Successfully",
      data: updateCategory,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

// @Method: GET
// @Route : api/category/:productSubcategoryId
// @Desc  : Get category by SubCategoryid
exports.getCategoryBySubCategoryId = async (req, res) => {
  let id = req.params.id;
  if (!id) {
    return res.status(400).json({
      message: "feilds are required",
    });
  }
  try {
    const category = await Category.find({ SubCategory: id });
    // if (category.length < 1) {
    //   return res.status(200).json({
    //     message: "No Catagories",
    //   });
    // }
    res.status(200).json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
