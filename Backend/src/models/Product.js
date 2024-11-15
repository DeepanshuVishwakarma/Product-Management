const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  inStock: {
    type: Boolean,
    required: true,
    default: true,
  },
});

ProductSchema.pre("validate", async function (next) {
  if (!this.id) {
    // Only set `id` if it's not already set (useful for update cases)
    const timestamp = Date.now().toString(36);
    const randomString = Math.random().toString(36).substring(2, 7);
    this.id = timestamp + randomString;
  }
  next();
});

module.exports = new mongoose.model("Product", ProductSchema);
