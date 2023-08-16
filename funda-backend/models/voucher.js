const mongoose = require("mongoose");
const schema = mongoose.Schema;
const voucherSchema = new schema(
  {
    voucher_code: { type: String, unique: true, required: true },
    voucher_name: { type: String, required: true },
    voucher_quantity: { type: Number, required: true },
    voucher_discount: { type: Number, required: true },
    minimum_amount: { type: Number, required: true },
    expire_date: { type: Date, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("voucher", voucherSchema);
