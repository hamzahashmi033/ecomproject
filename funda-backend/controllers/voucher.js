const Voucher = require("../models/voucher");

exports.checkVoucher = async (req, res, next) => {
  const vcode = req.body.code;
  let totalAmount = req.body.amount;

  if (!vcode || !totalAmount) {
    return res.status(422).json({
      message: "Feilds Are Mising",
    });
  }
  const dateNow = new Date().toISOString();

  try {
    const voucher = await Voucher.findOne({ voucher_code: vcode });

    if (!voucher) {
      return res.status(422).json({
        message: "invalid voucher code",
      });
    }

    if (voucher.voucher_quantity < 1) {
      return res.status(400).json({
        message: "voucher limits ended",
      });
    }
    if (dateNow > voucher.expire_date.toISOString()) {
      return res.status(400).json({
        message: "voucher is expired",
      });
    }
    if (voucher.minimum_amount > totalAmount) {
      return res.status(400).json({
        message: "you have to increase amount up to " + voucher.minimum_amount,
      });
    } else {
      totalAmount = totalAmount - voucher.minimum_amount;
      let voucherAmount = voucher.minimum_amount;
      return res.json({
        SubtractedAmount: totalAmount,
        voucherAmount,
        voucher,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "server sider error",
      error: err.message,
    });
  }
};

exports.addVoucher = async (req, res, next) => {
  const {
    voucherCode,
    voucherName,
    voucherQuantity,
    voucherDiscount,
    minimumAmount,
    expire_date,
  } = req.body;

  if (
    !voucherCode ||
    !voucherName ||
    !voucherQuantity ||
    !voucherDiscount ||
    !minimumAmount ||
    !expire_date
  ) {
    return res.status(422).json({
      message: "All feilds require ",
    });
  }
  try {
    const voucher = new Voucher({
      voucher_code: voucherCode,
      voucher_name: voucherName,
      voucher_quantity: voucherQuantity,
      voucher_discount: voucherDiscount,
      minimum_amount: minimumAmount,
      expire_date,
    });
    await voucher.save();
    return res.status(201).json({
      message: "sucess",
      voucher,
    });
  } catch (err) {
    return res.status(500).json({
      message: "server sider error",
      error: err.message,
    });
  }
};

exports.getAllVoucher = async (req, res, next) => {
  try {
    const vouchers = await Voucher.find();

    // if (vouchers.length < 1) {
    //   return res.status(400).json({
    //     message: "NO voucher found",
    //   });
    // }
    return res.status(200).json({
      message: "getting all voucher",
      vouchers,
    });
  } catch (err) {
    res.json({
      message: "server Sider error",
      error: err.message,
    });
  }
};

exports.getVoucherByCode = async (req, res, next) => {
  const Vouchercode = req.params.code;
  if (!Vouchercode) {
    return res.status(400).json({
      message: "voucher code is required",
    });
  }
  const d = new Date().toISOString();

  try {
    const voucher = await Voucher.find({ voucher_code: Vouchercode });

    if (voucher.length < 1) {
      return res.status(400).json({
        message: "No voucher Available",
      });
    }

    if (d > voucher[0].expire_date.toISOString()) {
      return res.status(500).json({
        message: "your voucher is expired",
      });
    }

    res.status(200).json({
      message: "sucess",
      voucher,
    });
  } catch (err) {
    res.status(500).json({
      message: "server sider error",
      error: err.message,
    });
  }
};

exports.deleteVoucher = async (req, res, next) => {
  const id = req.params.voucherId;
  if (!id) {
    return res.status(422).json({
      message: "feilds are missing",
    });
  }
  try {
    await Voucher.remove({ _id: id });
    res.status(200).json({
      message: "voucher id is deleted",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.updateVoucher = async (req, res, next) => {
  const id = req.params.vID;
  const {
    voucher_code,
    voucher_name,
    voucher_quantity,
    voucher_discount,
    minimum_amount,
    expire_date,
  } = req.body;
  if (
    !id ||
    !voucher_code ||
    !voucher_name ||
    !voucher_quantity ||
    !voucher_discount ||
    !minimum_amount ||
    !expire_date
  ) {
    return res.status(422).json({
      message: "feilds are missing",
    });
  }
  try {
    const voucher = await Voucher.updateOne(
      { _id: id },
      {
        $set: {
          voucher_code,
          voucher_name,
          voucher_quantity,
          voucher_discount,
          minimum_amount,
          expire_date,
        },
      }
    );
    return res.status(201).json({
      message: "voucher updated",
      voucher,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
