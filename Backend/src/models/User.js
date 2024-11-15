const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  name: {
    type: "String",
    required: true,
  },

  email: {
    type: "String",
    required: true,
  },
  password: {
    type: "String",
    requireed: true,
  },
});

UserSchema.pre("save", async function (next) {
  const timestamp = Date.now().toString(36);
  const randomString = Math.random().toString(36).substring(2, 7);
  this.id = timestamp + randomString;
  next();
});

module.exports = new mongoose.model("User", UserSchema);
