//Full name , mobile no, pincode , flat/house no, area/street, landmark optional, productQuantity, seller, total amount, paymentType
const mongoose = require("mongoose");
const schema = mongoose.Schema;

//array = prodid, qty , total , price,selerid

const orderSchema = new schema(
  {
    userId: { type: schema.Types.ObjectId, required: true },
    OrderId: { type: Number, required: true, default: 100 },
    //sellerId: { type: schema.Types.ObjectId, require: true },
    fullName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    pinCode: { type: String, required: true },

    houseAddress: { type: String, required: true },
    company: { type: String },
    sellerId: {
      type: Array,
      required: true,
    },
    email: { type: String, required: true },

    //area: { type: String, required: true },

    state: { type: String, required: true },
    city: { type: String, required: true },
    //productDescription , productImages, productName
    items: [
      {
        sellerId: { type: schema.Types.ObjectId, required: true },
        productId: { type: schema.Types.ObjectId, required: true },
        productName: { type: String, required: true },
        productDescription: { type: String, required: true },
        productImage: { type: Array },
        price: { type: String, required: true },
        quantity: { type: Number, required: true },
        total: { type: String, required: true },
        selectedAttributes: [
          {
            attributeName: { type: String, required: true },
            attributePrice: { type: Number, require: true },
          },
        ],
      },
    ],
    voucher_code: { type: String, default: "No Voucher Added" },
    totalAmount: { type: Number, required: true },
    paymentType: { type: String, required: true },
    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
