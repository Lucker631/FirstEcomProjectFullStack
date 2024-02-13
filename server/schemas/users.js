const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: false },
  phone: { type: String, unique: true },
  admin: { type: Boolean, required: true },
});

module.exports = mongoose.model("user", usersSchema);
