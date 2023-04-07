const { Schema, model } = require("mongoose");

const User = new Schema({
  email: { type: String, required: true, unique: true },
  phone: { type: String, require: false },
  firstName: { type: String, require: false },
  lastName: { type: String, require: false },
  image: { type: String, require: false },
  password: { type: String, required: true }
});

module.exports = model("User", User);
