const mongoose = require("mongoose");
require("dotenv").config();

MONGODB_URL = process.env.MONGODB_URL;

exports.connect = () => {
  mongoose
    .connect(MONGODB_URL)
    .then(() => {
      console.log("db connected successfully");
    })
    .catch((err) => {
      console.log("db connection failed");
      console.log(err);
      process.exit(1);
    });
};
