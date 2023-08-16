const mongoose = require("mongoose");
const schema = mongoose.Schema;

const wishListSchema = new schema(
  {
    productID: {
      type: Array,
      required: true,
    },
    userID: { type: schema.Types.ObjectId, ref: "Users" },

    /* 
    items : [ 
      {
        productName : {type : String},
        productPrice : {type : Number},
        productQuantity : {type : Number}
      }
    ]
    */
  },
  { timestamps: true }
);

module.exports = mongoose.model("WishList", wishListSchema);
