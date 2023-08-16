const SubCategory = require("../models/SubCategory");

// @Method: POST
// @Route : api/subCategory/createSubCategory
// @Desc  : Handling the creation of Sub Category
exports.createSubCategory = async (req, res, next) => {
  try {
    const { subCategoryName, categoryId } = req.body;
    if (!subCategoryName || !categoryId) {
      return res.status(400).json({
        success: false,
        message: "Please enter/select all the fields.",
      });
    }
    let subCategory = await SubCategory.findOne({
      subCategoryName,
      categoryId,
    });
    // let Category = await SubCategory.findOne({ categoryId });
    if (subCategory) {
      return res
        .status(400)
        .json({ success: false, message: "Sub Category already exists" });
    }
    subCategory = await SubCategory.create({
      subCategoryName,
      categoryId,
    });
    res.status(200).json({
      success: true,
      message: "Subcategory Added Sucessfully",
      data: subCategory,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @Method: GET
// @Route : api/subCategory/
// @Desc  : Get all Sub Categories
exports.getSubCategory = async (req, res) => {
  try {
    const subCategories = await SubCategory.find();
    res.status(200).json({ success: true, data: subCategories });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @Method: GET
// @Route : api/subCategory/:id
// @Desc  : Get Sub Category by id
exports.getSubCategoryById = async (req, res) => {
  let id = req.params.id;
  if (!id) {
    return res.status(422).json({
      message: "feilds are required",
    });
  }
  try {
    const subCategory = await SubCategory.findById(id);
    if (!subCategory) {
      return res.status(422).json({
        message: "NOT FOUND",
      });
    }
    res.status(200).json({ success: true, data: subCategory });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @Method: DELETE
// @Route : api/subCategory/:id
// @Desc  : Delete Sub Category by id
exports.removeSubCategory = async (req, res) => {
  let id = req.params.id;
  if (!id) {
    return res.status(422).json({
      message: "feilds are required",
    });
  }
  try {
    const removedSubCategory = await SubCategory.remove({ _id: id });
    res.status(200).json({
      success: true,
      message: "Sub Category Deleted Successfully",
      data: removedSubCategory,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @Method: PATCH
// @Route : api/subCategory/:id
// @Desc  : Handling the updation of Sub Category
exports.updateSubCategory = async (req, res, next) => {
  try {
    let id = req.params.id;
    const { subCategoryName, subCategoryComission, categoryId } = req.body;
    if (!subCategoryName || !subCategoryComission || !categoryId || !id) {
      return res.status(400).json({
        success: false,
        message: "Please enter/select all the fields.",
      });
    }

    const updatedSubCategory = await SubCategory.updateOne(
      { _id: id },
      {
        $set: {
          subCategoryName: subCategoryName,
          categoryId: categoryId,
          subCategoryComission: subCategoryComission,
        },
      }
    );
    res.status(200).json({
      success: true,
      message: "Sub Category Updated Successfully",
      data: updatedSubCategory,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @Method: GET
// @Route : api/subCategory/:categoryId
// @Desc  : Get Sub Category by Category id
exports.getSubCategoryByCategoryId = async (req, res) => {
  let id = req.params.id;
  if (!id) {
    return res.status.json({
      message: "feilds are required",
    });
  }
  try {
    const subCategory = await SubCategory.find({ categoryId: id });
    res.status(200).json({ success: true, data: subCategory });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
