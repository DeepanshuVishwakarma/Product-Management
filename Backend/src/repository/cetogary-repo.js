const Category = require("../models/Categories");
const Crud = require("../repository/crud");
class CategoryRepository extends Crud {
  constructor() {
    super(Category);
  }
}

module.exports = CategoryRepository;
