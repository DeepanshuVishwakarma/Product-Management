const express = require("express");
const { createUser, deleteUser } = require("../controllers/user-controller");
const router = express.Router();

router.delete("/delete", deleteUser);

module.exports = router;
