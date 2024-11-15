const Product = require("../models/Product");
const Crud = require("../repository/crud");
class ProductRepository extends Crud {
  constructor() {
    super(Product);
  }
}

module.exports = ProductRepository;
