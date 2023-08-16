const Sale = require("../models/deal");
//const { findOne } = require("../models/Product");
const Product = require("../models/Product");

exports.addSale = async (req, res, next) => {
  let { saleTitle, saleStart, saleEnd, salePercentOff, banner } = req.body;

  if (!saleTitle || !saleStart || !saleEnd || !salePercentOff || !banner) {
    return res.status(422).json({
      message: "Empty feilds",
    });
  }
  try {
    const sale = new Sale({
      saleTitle,
      saleStart,
      saleEnd,
      salePercentOff,
      banner,
    });
    await sale.save();
    return res.status(201).json({
      message: "sale added",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

exports.getSale = async (req, res, next) => {
  try {
    const sale = await Sale.find();
    return res.status(200).json({
      sale,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.getSingleSale = async (req, res, next) => {
  const id = req.params.saleId;
  if (!id) {
    return res.status(422).json({
      message: "params is required",
    });
  }
  try {
    const sale = await Sale.findById(id).populate("productIDs");
    if (!sale) {
      return res.status(400).json({
        message: "this sale is not available",
      });
    }
    return res.status(200).json({
      sale,
    });
  } catch (error) {
    res.status(500).json({
      message: errror.message,
    });
  }
};

exports.deleteSale = async (req, res, next) => {
  const id = req.params.saleId;
  if (!id) {
    return res.status(422).json({
      message: "params is required",
    });
  }
  try {
    const sale = await Sale.findOne({ _id: id });
    if (!sale) {
      return res.status(400).json({
        message: "Sale Is Not Available Or Expire",
      });
    }
    if (sale.productIDs.length >= 1) {
      for (let i = 0; i < sale.productIDs.length; i++) {
        const delProdFeild = await Product.findOne({ _id: sale.productIDs[i] });
        if (delProdFeild) {
          delProdFeild.salePercentDiscount = undefined;
          await delProdFeild.save();
        }
      }
    }
    await Sale.deleteOne({ _id: id });
    return res.status(202).json({
      message: "delete sucessfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.updateSale = async (req, res, next) => {
  const id = req.params.saleId;
  const { saleTitle, saleStart, saleEnd, salePercentOff, banner } = req.body;
  if (
    !saleTitle ||
    !saleStart ||
    !saleEnd ||
    !salePercentOff ||
    !banner ||
    !id
  ) {
    return res.status(422).json({
      message: "All feilds are required",
    });
  }
  try {
    const updateSale = await Sale.updateOne(
      { _id: id },
      { $set: { saleTitle, saleStart, saleEnd, salePercentOff, banner } }
    );
    return res.status(202).json({
      message: updateSale,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.addSalesProduct = async (req, res, next) => {

  const saleId = req.params.saleId;
  const prodId = req.body.productId;
  if (!saleId || !prodId) {
    return res.status.json({
      message: "All feilds are required",
    });
  }
  try {
    //let salePrice;
    const check = await Sale.findOne({ _id: saleId });
    if (!check) {
      return res.status(400).json({
        message: "Sale is not Available",
      });
    }

    const checkProduct = check.productIDs.find((pId) => pId == prodId);

    if (checkProduct) {
      return res.status(422).json({
        message: "Product Already Exist",
      });
    }
    check.productIDs.push(prodId);

    const product = await Product.findOne({ _id: prodId });
    if (!product) {
      return res.status(400).json({
        message: "Product Donot Exist",
      });
    }
    // salePrice = (parseInt(product.productPrice) * check.salePercentOff) / 100;
    // product.salePercentDiscount = parseInt(product.productPrice) - salePrice;
    product.salePercentDiscount = check.salePercentOff;
    await check.save();
    await product.save();
    return res.status(202).json({
      message: "product is added",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.deleteSalePrdunct = async (req, res, next) => {
  const id = req.params.saleId;
  const prodId = req.body.productID;
  if (!id || !prodId) {
    return res.status(422).json({
      message: "All Feilds Are Required",
    });
  }
  try {
    const sale = await Sale.findOne({ _id: id });
    sale.productIDs.pull(prodId);
    await sale.save();
    const product = await Product.findOne({ _id: prodId }).select(
      "salePercentDiscount"
    );
    if (!product) {
      return res.status(400).json({
        message: "Product donot Exist",
      });
    }
    product.salePercentDiscount = undefined;
    await product.save();
    return res.status(202).json({
      message: "product deleted sucessfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
