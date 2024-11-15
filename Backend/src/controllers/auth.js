const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.signup = async (req, res) => {
  console.log("Signup controller called");
  password;
  try {
    const { name, email, confirmPassword, password } = req.body;
    console.log("Request body: " + JSON.stringify(req.body));
    console.log(name, email, password, confirmPassword);

    if (!name || !email || !password || !confirmPassword) {
      S;
      return res.status(403).send({
        success: false,
        message: "All Fields are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Password and Confirm Password do not match. Please try again.",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists. Please sign in to continue.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(200).json({
      success: true,
      user,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered. Please try again.",
    });
  }
};

exports.login = async (req, res) => {
  try {
    console.log("Logging in....");
    const { email, password } = req.body;

    if (!email || !password) {
      console.log("Please fill up all the required fields");
      return res.status(400).json({
        success: false,
        message: "Please fill up all the required fields",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.log(
        "User is not registered with us. Please sign up to continue."
      );
      return res.status(401).json({
        success: false,
        message: "User is not registered with us. Please sign up to continue.",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (isPasswordMatch) {
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      user.token = token;
      user.password = undefined;

      console.log("Login ", user);
      res.status(200).json({
        success: true,
        token,
        user: user,
        message: "User login success",
      });

      console.log("Logged in");
    } else {
      console.log("Login failed: Incorrect password");
      return res.status(401).json({
        success: false,
        message: "Password is incorrect",
      });
    }
  } catch (error) {
    console.error(error);
    console.log("Login failed");
    return res.status(500).json({
      success: false,
      message: "Login failure, please try again",
    });
  }
};
