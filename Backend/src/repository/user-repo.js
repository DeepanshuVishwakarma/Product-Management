const User = require("../models/User");
const Crud = require("../repository/crud");
class UserRepository extends Crud {
  constructor() {
    super(User);
  }
}

module.exports = UserRepository;
