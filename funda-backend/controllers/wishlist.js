const wishList = require("../models/wishList");
const product = require("../models/Product");

exports.GetWishListProduct = async (req, res, next) => {
  const userId = req.params.user;
  if (!userId) {
    return res.status(422).json({
      message: "feilds are missing",
    });
  }
  try {
    const wish = await wishList.findOne({ userID: userId });
    if (!wish) {
      ``;
      return res.status(422).json({
        message: "no wish list",
      });
    }
    const arr = wish.productID;
    // const p = await product.findOne({ _id: arr[0] });
    let data = [];
    for (i = 0; i < arr.length; i++) {
      const p = await product.findOne({ _id: arr[i] });
      data.push(p);
      //data += p;
    }
    return res.status(201).json({
      message: "product found sucessfully",
      product: data,
    });
  } catch (err) {
    return res.status(500).json({
      message: "server sider error",
      error: err.message,
    });
  }
};

exports.saveWishList = async (req, res, next) => {
  const userId = req.params.userID;
  const productId = req.body.prodID;
  if (!userId || !productId) {
    return res.status(422).json({
      message: "Undefine  params or body",
    });
  }
  try {
    const available = await wishList.findOne({ userID: userId });
    if (available) {
      available.productID = productId;
      await available.save();
      return res.json({
        message: "Update occure",
      });
    } else {
      const wish = new wishList({
        productID: productId,
        userID: userId,
      });
      await wish.save();
      return res.json({
        message: "new wish list",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "server side error",
    });
  }
};

exports.postProduct = async (req, res, next) => {
  const prodID = req.body.productId;
  const userID = req.body.userID;
  if (prodID == undefined || userID == undefined) {
    const error = new Error("Incomplete Data");
    error.statusCode = 422;
    return next(error);
  }
  try {
    const prod = await wishList.findOne({ userID: userID });
    if (prod) {
      let check = prod.productID.find((item) => item == prodID);
      if (check) {
        return res.status(400).json({
          message: "product already exist",
        });
      } else {
        prod.productID.push(prodID);
        await prod.save();
      }
    } else {
      const wishlist = new wishList({
        productID: prodID,
        userID: userID,
      });
      await wishlist.save();
    }
    return res.status(201).json({
      message: "PRODUCT IS ADDED TO WISH LIST",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.removeProductFromWish = async (req, res, next) => {
  const { prodId } = req.body;
  const id = req.params.userId;
  if (!prodId || !id) {
    return res.status(422).json({
      message: "feilds are required",
    });
  }
  try {
    const wish = await wishList.findOne({ userID: id });
    if (wish) {
      wish.productID.pull(prodId);

      await wish.save();
      return res.status(202).json({
        message: "Sucessfully Removed product from wish",
      });
    } else {
      return res.status(422).json({
        message: "wish is not available",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

exports.addProductAfterLogin = async (req, res, next) => {
  const { arrProductId, userID } = req.body;
  if (!arrProductId || !userID) {
    return res.status(422).json({
      message: "Empty Feilds",
    });
  }
  try {
    const wish = await wishList.findOne({ userID: userID });
    if (wish) {
      let a = arrProductId.filter((dt) =>
        wish.productID.every((dta) => dta != dt)
      );
      const final = [...wish.productID, ...a];
      wish.productID = final;
      await wish.save();
    } else {
      const wish = new wishList({
        productID: arrProductId,
        userID: userID,
      });
      await wish.save();
    }
    return res.status(200).json({
      message: "PRODUCT IS ADDED TO WISH LIST",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const wish = await wishList.find();
    // if (wish.length <= 0) {
    //   const error = new Error("Donot Have wish List");
    //   error.statusCode = 422;
    //   return next(error);
    // }
    res.status(200).json({
      message: "Getting All Wish List",
      data: wish,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteSingleWishList = async (req, res, next) => {
  const id = req.params.wishID;
  if (!id) {
    return res.status(422).json({
      message: "feilds are missing",
    });
  }
  try {
    await wishList.remove({ _id: id });
    res.status(200).json({
      message: "Delete Single Item",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getByUser = async (req, res, next) => {
  const user = req.params.userID;
  if (!user) {
    return res.status(422).json({
      message: "Feilds are missing",
    });
  }
  try {
    const list = await wishList.find({ userID: user });
    // if (list.length < 1) {
    //   return res.status(422).json({
    //     message: "wish is not Available",
    //   });
    // }
    res.status(200).json({
      message: "Getting all list of user",
      data: list,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
