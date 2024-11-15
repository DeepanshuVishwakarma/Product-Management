const User = require("../models/User");
const UserRepository = require("../repository/product-repo");

const createUserService = async (req) => {
  console.log("inside userService");

  const response = await UserRepository.create(data);
  console.log(response);
  return response;
};

const deleteUserService = async (req) => {
  console.log("inside userService");

  const user = req.user;
  const { id } = user;

  if (!user || !id)
    console.log(
      "user not found inside the request , issuses in the middleware"
    );
  const response = await UserRepository.deleteById(data);
  console.log(response);

  return response;
};

module.exports = {
  createUserService,
  deleteUserService,
};
