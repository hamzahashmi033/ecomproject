const mongoose = require("mongoose");
const schema = mongoose.Schema;

const bannerSchema = new schema(
  {
    bannerImage: { type: Array },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Banner", bannerSchema);
