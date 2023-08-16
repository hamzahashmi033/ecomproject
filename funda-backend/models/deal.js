const mongoose = require("mongoose");
const schema = mongoose.Schema;

const saleSchema = new schema({
  saleTitle: { type: String },
  productIDs: [{ type: schema.Types.ObjectId, ref: "Product" }],
  saleStart: { type: Date },
  saleEnd: { type: Date },
  salePercentOff: { type: Number },
  banner: { type: String },
});

module.exports = mongoose.model("deals", saleSchema);
