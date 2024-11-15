const mongoose = require("mongoose");
const ProductCategorySchema = new mongoose.Schema({
  name: {
    type: "String",
    required: true,
  },
  id: {
    type: "String",
    required: true,
  },
});

module.exports = new mongoose.model("Category", ProductCategorySchema);
