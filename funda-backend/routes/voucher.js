const express = require("express");
const router = express.Router();
const voucherController = require("../controllers/voucher");

router.post("/add", voucherController.addVoucher);
router.get("/get", voucherController.getAllVoucher);
router.get("/getbycode/:code", voucherController.getVoucherByCode);
router.post("/checkvoucher", voucherController.checkVoucher);
router.patch("/update/:vID", voucherController.updateVoucher);
router.delete("/deletevoucher/:voucherId", voucherController.deleteVoucher);

module.exports = router;
