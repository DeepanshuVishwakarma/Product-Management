const express = require("express");
const productController = require("../controllers/product-controller");

const router = express.Router();

const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// placed middleware here inside the root becz of some error
async function auth(req, res, next) {
  try {
    console.log("inside auth middleware");
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      console.log("no token");
      return res.status(401).json({
        success: false,
        message: "Token Missing",
      });
    }

    try {
      console.log("verifying token");
      const decode = await jwt.verify(token, process.env.JWT_SECRET);
      console.log(decode);

      req.user = decode;

      const email = req.user.email;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "User not found",
        });
      }
      req.user = user;
    } catch (error) {
      console.log(error);
      return res.status(401).json({
        success: false,
        message: "Token is not valid",
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      error: error,
      success: false,
      message: "Something Went Wrong While Validating the Token",
    });
  }
}

router.post("/create", auth, productController.createProduct);
router.get("/getAll", productController.getAllProduct);
router.get("/get/:id", productController.getProductById);
router.put("/update/:id", auth, productController.updateProduct);
router.get("/delete/:id", auth, productController.deleteProduct);

// router.post("/create", productController.createProduct);
// router.get("/getAll", productController.getAllProduct);
// router.get("/get/:id", productController.getProductById);
// router.put("/update/:id", productController.updateProduct);
// router.get("/delete/:id", productController.deleteProduct);

module.exports = router;
