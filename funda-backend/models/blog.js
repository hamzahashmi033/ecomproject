const mongoose = require("mongoose");
const schema = mongoose.Schema;

const blogSchema = new schema({
  title: { type: String, required: true },
  image: { type: Array, required: true },
  description: { type: String, required: true },
  catagory: { type: String },
  created_by: { type: schema.Types.ObjectId, required: true },
});

module.exports = mongoose.model("blog", blogSchema);
