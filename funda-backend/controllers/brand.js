const Brands = require("../models/Brand");

// @Method: POST
// @Route : api/brand/createbrand
// @Desc  : Handling the creation of brand
//brandWebsite
//brandName
exports.createBrand = async (req, res) => {
  try {
    const { brandName, brandImage } = req.body;
    if (!brandName || !brandImage) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter brand name." });
    }
    let Brand = await Brands.findOne({ brandName });
    if (Brand) {
      return res
        .status(400)
        .json({ success: false, message: "Brand already exists" });
    }
    Brand = await Brands.create({ brandName, brandImage });
    res.status(200).json({ success: true, data: Brand });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// @Method: GET
// @Route : api/brand/
// @Desc  : Get all brands
exports.getBrand = async (req, res) => {
  try {
    const Brand = await Brands.find();
    res.status(200).json({ success: true, data: Brand });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// @Method: DELETE
// @Route : api/brand/:id
// @Desc  : Delete brand by id
exports.removeBrand = async (req, res) => {
  try {
    let id = req.params.id;
    const removedBrand = await Brands.findById(id);
    if (!removedBrand) {
      return res.status(400).json({ message: "Brand does not exist" });
    }
    await Brands.remove({ _id: id });
    res
      .status(200)
      .json({ success: true, message: "Brand Deleted Sucessfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// @Method: PATCH
// @Route : api/brand/:id
// @Desc  : Handling the updation of brand
exports.updateBrand = async (req, res) => {
  try {
    const update = req.body;
    let id = req.params.id;
    const brand = await Brands.findByIdAndUpdate(id, { $set: update });
    res.status(200).json({
      success: true,
      message: "Brand updated Sucessfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
