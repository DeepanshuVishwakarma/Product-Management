const User = require("../models/User");
const {
  isEmailValid,
  isValidPassword,
  isValidName,
} = require("../utils/validators");
const { UserServices } = require("../service/index");
const AppError = require("../error/AppError");
const createUser = (req, res) => {
  try {
    console.log("inside createUser controller method");
    const { name, email, password } = req.body;

    if (
      !isEmailValid(email) ||
      !isPasswordValid(password) ||
      !isValidName(name)
    ) {
      console.log(anme, email, password);
      throw new AppError("Invalid fields", 400);
    }
    const response = UserServices.createUserService(req);
    console.log(response);
    return response;
  } catch (e) {
    throw new Error("Error creating user: " + e.message);
  }
};
const deleteUser = (req, res) => {
  try {
    const response = UserServices.createUserService(req);
    return res(200).json({
      message: "user created successfully",
      data: response,
    });
  } catch (e) {
    throw new Error("Error deleting user: " + e.message);
  }
};
// const updateUser = (req, res) => {
//   try {
//   } catch (e) {
//     throw new Error("Error updating user: " + e.message);
//   }
// };

// const getUser = (req, res) => {
//   try {
//   } catch (e) {
//     throw new Error("Error getting user details: " + e.message);
//   }
// };

module.exports = {
  createUser,
  deleteUser,
};
