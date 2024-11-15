const express = require("express");
const cors = require("cors");
const app = express();
const { connect } = require("./src/config/db");
// const { productRoutes, userRoutes, userAuth } = require("./src/routes/index");
const bodyParser = require("body-parser");
const productRoutes = require("./src/routes/product-route");

const userRoutes = require("./src/routes/user-route");

const userAuth = require("./src/routes/user-auth");
app.use(express.json());

app.use(cors({ origin: "*" }));

app.use("/api/products/", productRoutes);
app.use("/api/user/", userRoutes);
app.use("/api/auth/", userAuth);

connect();
app.get("/", (req, res) => {
  res.send(200).json({
    "hello world": "hello world",
  });
});

app.get("/ping", (req, res) => {
  res.send("pong");
});
app.listen(8000, () => {
  try {
  } catch (err) {
    throw new Error("Could not run the app");
  }
});
