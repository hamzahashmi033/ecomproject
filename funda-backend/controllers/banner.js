const Banner = require("../models/banner");

exports.addBanner = async (req, res, next) => {
  const bannerImage = req.body;
  try {
    const banner = new Banner({
      bannerImage,
    });
    await banner.save();
    res.status(201).json({
      message: "banner",
      banner,
    });
  } catch (err) {
    res.status(422).json({
      message: "server side error",
      error: err.message,
    });
  }
};

exports.getBanner = async (req, res, next) => {
  try {
    const banner = await Banner.find();
    if (!banner) {
      return res.status(422).json({
        message: "No Banner is found",
      });
    }
    if (banner.length <= 0) {
      return res.status(422).json({
        message: "No Banner is found",
      });
    }
    res.status(200).json({
      message: "get all banners",
      Banners: banner,
    });
  } catch (err) {
    res.status(500).json({
      message: "server sider error",
      error: err.status,
    });
  }
};

exports.deleteBanner = async (req, res, next) => {
  const id = req.params.bannerID;
  if (!id) {
    return res.status(422).json({
      message: "params is required",
    });
  }
  try {
    await Banner.remove({ _id: id });
    res.status(200).json({
      message: "Remove Sucessfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "server sider Error",
      error: err.message,
    });
  }
};

exports.updateBanner = async (req, res, next) => {
  const id = req.params.BannerID;
  const title = req.body.title;
  if (!id || title) {
    return res.status(422).json({
      message: "feilds are required",
    });
  }

  try {
    const update = await Banner.updateOne(
      { _id: id },
      {
        $set: {
          title: title,
          bannerImage: req.imageArr,
        },
      }
    );
    res.status(201).json({
      message: "Update Sucessfully",
      update,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server Sider Error",
      error: err.message,
    });
  }
};
